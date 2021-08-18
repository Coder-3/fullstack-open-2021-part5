import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const hideWhenIsExpanded = { display: isExpanded ? 'none' : '' }
  const showWhenIsExpanded = { display: isExpanded ? '' : 'none' }

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    likeBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenIsExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>View</button>
      </div>
      <div style={showWhenIsExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br></br>
        {blog.user.name}
        <br></br>
      </div>
    </div>
  )
}

export default Blog