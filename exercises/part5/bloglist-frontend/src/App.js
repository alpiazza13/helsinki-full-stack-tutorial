import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()


const addBlog = async (blogObject) => {
 blogFormRef.current.toggleVisibility()
 const blog = await blogService.create(blogObject)
 setBlogs(blogs.concat(blog))
}

  const handleLogin = async (event) => {
   event.preventDefault()
   try {
     const user = await loginService.login({
       username, password,
     })

     window.localStorage.setItem(
       'loggedBlogappUser', JSON.stringify(user)
     )

     blogService.setToken(user.token)
     setUser(user)
     setUsername('')
     setPassword('')
   } catch (exception) {
       console.log('login failed')
   }
 }

  const handleLogout = () => {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
  }

const blogForm = () => (
    <Togglable buttonLabel='create a blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
         />
    </Togglable>
)

if (user == null) { return (
    <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
    />
)}

 return (
   <div>
     <h2>blogs</h2>
      {blogForm()}

     {blogs.map(blog =>
       <Blog key={blog.id} blog={blog} />
     )}
     <button onClick={handleLogout}> logout </button>
   </div>
 )
}

export default App
