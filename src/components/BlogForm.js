import React from 'react'

const BlogForm = ({
  handleCreate,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
        author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm