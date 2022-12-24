import React, { useState, useMemo, useEffect } from "react"
import "./styles/App.css"
// import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import PostForm from "./components/PostForm"
import PostFilter from "./components/PostFilter"
import MyModal from "./components/UI/modal/MyModal"
import { usePosts } from "./hooks/usePosts"
import PostService from "./API/PostService"
import MyLoader from "./components/UI/loader/MyLoader"
import useFetching from "./hooks/useFetching"
import getPageCount from "./utils/pages"
import Pagination from "./components/UI/pagination/Pagination"

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = response.headers["x-total-count"]
      setTotalPages(getPageCount(totalCount, limit))
    }
  )

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal((prev) => !prev)
  }

  const removePost = (id) => {
    setPosts((posts) => {
      return posts.filter((post) => post.id !== id)
    })
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "25px" }}
        onClick={() => setModal((prev) => !prev)}
      >
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <MyLoader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Посты"
        />
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  )
}

export default App
