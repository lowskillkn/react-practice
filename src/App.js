import React, { useState, useMemo, useEffect } from "react"
import axios from "axios"
import "./styles/App.css"
import Counter from "./components/Counter"
import ClassCounter from "./components/ClassCounter"
// import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import PostForm from "./components/PostForm"
import MySelect from "./components/UI/select/MySelect"
import PostFilter from "./components/PostFilter"
import MyModal from "./components/UI/modal/MyModal"
import { usePosts } from "./hooks/usePosts"

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  async function fetchPosts() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    )
    setPosts(response.data)
  }

  useEffect(() => {
    fetchPosts()
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
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про фрукты"
      />
    </div>
  )
}

export default App
