import React, { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm