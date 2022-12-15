import React, { useState } from "react"
import MyInput from "./UI/input/MyInput"
import MyButton from "./UI/button/MyButton"

export default function PostForm(props) {
  const [post, setPost] = useState({ title: "", body: "" })

  const addNewPost = (event) => {
    event.preventDefault()
    if (!post.title || !post.body) return
    props.create({ id: Date.now(), ...post })
    setPost({ title: "", body: "" })
  }

  return (
    <>
      <form>
        <MyInput
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          value={post.body}
          onChange={(event) => setPost({ ...post, body: event.target.value })}
          type="text"
          placeholder="Описание поста"
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    </>
  )
}
