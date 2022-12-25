import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostService from "../API/PostService"
import MyLoader from "../components/UI/loader/MyLoader"
import useFetching from "../hooks/useFetching"

export default function PostIdPage() {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const [fetchPostById, isPostLoading, fetchPostError] = useFetching(
    async (id) => {
      const response = await PostService.getById(id)
      setPost(response.data)
    }
  )
  const [fetchComments, isCommentsLoading, fetchCommentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data)
    }
  )

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h2>Вы открыли страницу поста с ID = {params.id}</h2>
      {isPostLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      {isCommentsLoading ? (
        <MyLoader />
      ) : (
        comments.map((comment) => {
          return (
            <div
              style={{
                marginTop: 15,
                padding: "0px 50px",
              }}
              key={comment.email + comment.body}
            >
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          )
        })
      )}
    </div>
  )
}
