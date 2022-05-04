import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAPI } from '../api'

export default function Register(props) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [redirect, setRedirect] = useState(null)
  const [error, setError] = useState(null)

  const handleRegister = async () => {
    const res = await UserAPI.register(user.username, user.email, user.password)
    setUser({ username: '', email: '', password: '' })
    if (res.status.includes('error')) {
      // display error here
      setError(res.msg)
      setRedirect(null)
    } else {
      setError(null)
      setRedirect('/login')
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
      <button onClick={handleRegister}>Register</button>
      {redirect && <Navigate to={redirect} />}
    </div>
  )
}
