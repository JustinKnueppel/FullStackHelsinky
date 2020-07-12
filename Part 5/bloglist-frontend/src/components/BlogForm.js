import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const attemptPostBlog = (event) => {
    event.preventDefault();

    const likesNumber = likes && !isNaN(Number(likes)) ? Number(likes) : 0 

    const blog = {
      title,
      author,
      url,
      likes: likesNumber
    }

    addBlog(blog)
  }
  
  return (
    <form onSubmit={attemptPostBlog} >
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
      <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} />
      <input type="text" value={likes} onChange={(event) => setLikes(event.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default BlogForm