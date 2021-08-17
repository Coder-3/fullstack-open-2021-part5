import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      const theBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(theBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Unable to add new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={successMessage} />
        <ErrorMessage message={errorMessage} />
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {logout()}}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog">
          <BlogForm
            title={blogTitle}
            author={blogAuthor}
            url={blogUrl}
            handleTitleChange={({ target }) => setBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setBlogUrl(target.value)}
            handleCreate={handleAddBlog}
          />
        </Togglable>
        <div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      {user === null ?
      <div>
        {loginForm()} 
      </div>
      :
      <div>
        {showBlogs()}
      </div>
      }
    </div>
  )
}

export default App