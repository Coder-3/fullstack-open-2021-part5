import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  const likeBlog = () => {
    console.log('+1 to likes for ', blog.title)
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
        <button onClick={likeBlog}>like</button>
        <br></br>
        {blog.user.name}
        <br></br>
      </div>
    </div>
  )
}

export default Blog