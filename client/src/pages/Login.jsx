import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAPI } from '../api'

export default function Login(props) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [redirect, setRedirect] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    const res = await UserAPI.login(
      user.username === '' ? null : user.username,
      user.email === '' ? null : user.email,
      user.password
    )
    setUser({ username: '', email: '', password: '' })
    if (!res.status.includes('ok')) {
      // display error here
      setError(res.msg)
      setRedirect(null)
    } else {
      setError(null)
      localStorage.setItem('token', res.data.token)
      setRedirect('/')
    }
  }

  return (
    <div>
      {error && JSON.stringify(error)}
      <form onSubmit={e => e.preventDefault()}>
        <input
          value={user.username}
          type="text"
          name="username"
          placeholder="Enter username..."
          onChange={e =>
            setUser(prev => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="email"
          value={user.email}
          name="email"
          placeholder="Enter email..."
          onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={user.password}
          onChange={e =>
            setUser(prev => ({ ...prev, password: e.target.value }))
          }
        />
      </form>
      <button onClick={handleSubmit}>Login</button>
      {redirect && <Navigate to={redirect} />}
    </div>
  )
}
