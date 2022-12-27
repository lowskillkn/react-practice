import React, { useEffect, useRef, useState } from "react"
import PostService from "../API/PostService"
import PostFilter from "../components/PostFilter"
import PostForm from "../components/PostForm"
import PostList from "../components/PostList"
import MyButton from "../components/UI/button/MyButton"
import MyLoader from "../components/UI/loader/MyLoader"
import MyModal from "../components/UI/modal/MyModal"
import Pagination from "../components/UI/pagination/Pagination"
import MySelect from "../components/UI/select/MySelect"
import useFetching from "../hooks/useFetching"
import useObserver from "../hooks/useObserver"
import { usePosts } from "../hooks/usePosts"
import getPageCount from "../utils/pages"

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [autoFetching, setAutoFetching] = useState(true)
  const lastElement = useRef()
  const lastLimit = useRef(null)

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page = 1) => {
      const response = await PostService.getAll(limit, page)
      if (autoFetching) {
        if (page === 1) {
          setPosts(response.data)
          return
        }
        setPosts([...posts, ...response.data])
      } else {
        setPosts(response.data)
      }
      const totalCount = response.headers["x-total-count"]
      setTotalPages(getPageCount(totalCount, limit))
    }
  )

  useObserver(
    lastElement,
    page < totalPages,
    isPostsLoading,
    autoFetching,
    () => {
      setPage((page) => page + 1)
    }
  )

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    if (limit !== lastLimit.current) {
      fetchPosts(limit)
      lastLimit.current = limit
      return
    }
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal((prev) => !prev)
  }

  useEffect(() => {
    setPage(1)
  }, [autoFetching, limit])

  const removePost = (id) => {
    setPosts((posts) => {
      return posts.filter((post) => post.id !== id)
    })
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "25px" }}
        onClick={() => setModal((prev) => !prev)}
      >
        Создать пост
      </MyButton>
      <MyButton
        style={{ marginLeft: 15 }}
        onClick={() => {
          setAutoFetching((prev) => !prev)
        }}
      >
        Включить/Отключить автоподгрузку постов
      </MyButton>
      {autoFetching ? (
        <p>
          автоподгрузка постов <strong>включена</strong>
        </p>
      ) : (
        <p>
          автоподгрузка постов <strong>отключена</strong>
        </p>
      )}
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {!autoFetching && (
        <MySelect
          value={limit}
          onChange={(value) => {
            setLimit(value)
          }}
          defaultValue="Количество постов на странице"
          options={[
            { value: 5, name: "5" },
            { value: 10, name: "10" },
            { value: 25, name: "25" },
            { value: -1, name: "Показать все" },
          ]}
        />
      )}
      {postError && <h1>Произошла ошибка</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты"
      />
      <div ref={lastElement} style={{ height: 20 }} />
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <MyLoader />
        </div>
      )}
      {!autoFetching && (
        <Pagination
          totalPages={totalPages}
          page={page}
          changePage={changePage}
        />
      )}
    </div>
  )
}

export default Posts
