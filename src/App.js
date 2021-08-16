import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
      console.log('wrong credentials')
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
    } catch (exception) {
      console.log('unable to add blog')
    }
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {logout()}}>logout</button>
        </div>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleAddBlog}>
            title:
            <input
              value={blogTitle}
              onChange={({target}) => setBlogTitle(target.value)}
            />
            author:
            <input
              value={blogAuthor}
              onChange={({target}) => setBlogAuthor(target.value)}
            />
            url:
            <input
              value={blogUrl}
              onChange={({target}) => setBlogUrl(target.value)}
            />
            <button type="submit">create</button>
          </form>
        </div>
        <div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      </div>
    )
  }

  return (
    <div>

      {user === null ?
      loginForm() :
      <div>
        {showBlogs()}
      </div>
      }
    </div>
  )
}

export default App