import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogs'
import Comments from './Comments'
import { Button } from '@material-ui/core'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) {
    return null
  }

  const own = user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      history.push('/')
    }
  }

  const handleComment = (comment) => {
    dispatch(commentBlog(id, comment))
  }

  return (
    <div className='blog'>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          <span className='likes'>likes {blog.likes}</span>
          <Button className='likeBtn' onClick={handleLike}>like</Button>
        </div>
        {own && <button className='removeBtn' onClick={handleRemove}>remove</button>}
        <Comments comments={blog.comments} handleComment={handleComment} />
      </div>
    </div>
  )
}

export default Blog
