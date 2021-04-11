import React from 'react'

const Comments = ({ comments, handleComment }) => {
  if (comments.length === 0) {
    return null
  }

  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    handleComment(content)
  }

  return (
    <div>
      <h3>comments</h3>
      {comments.map((comment, index) => {
        return <p key={index}>{comment.content}</p>
      })}
      <form onSubmit={addComment}>
        <input name='comment' />
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default Comments
