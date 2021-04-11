import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

import Notifications from './Notifications'
import LoginForm from './LoginForm'
import BlogsView from './BlogsView'
import Blog from './Blog'
import Users from './Users'
import User from './User'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Footer from './Footer'

import storage from '../utils/storage'
import { setNotification } from '../reducers/notifications'
import { initializeBlogs, createBlog } from '../reducers/blogs'
import { login, logout } from '../reducers/user'
import { initializeUsers } from '../reducers/users'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const user = storage.loadUser()

    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    dispatch(
      setNotification(
        `a new blog '${newBlog.title}' by ${newBlog.author} added!`
      )
    )
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Button id='blogsButton' color='inherit' component={Link} to='/blogs'>
            Blogs
          </Button>
          <Button id='usersButton' color='inherit' component={Link} to='users'>
            Users
          </Button>
          {user ? (
            <em>{user.username} logged in</em>
          ) : (
            <Button id='loginButton' color='inherit' component={Link} to='/login'>
              login
            </Button>
          )}
          {user && (
            <Button id='logoutButton' color='inherit' onClick={handleLogout}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Notifications />
        <Switch>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blog/:id'>
            <Blog />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <BlogsView />
            {user && (
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} />
              </Togglable>
            )}
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
