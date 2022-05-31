import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../apis/user'
import { storeToken } from '../utils'

export default function Login(props) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const changeUsername = val => setForm(prev => ({ ...prev, username: val }))
  const changePassword = val => setForm(prev => ({ ...prev, password: val }))

  const handleLogin = async () => {
    setLoading(true)
    try {
      const token = await loginUser(form.username, form.password)
      storeToken(token)
      setError(null)
      setRedirect(true)
    } catch (err) {
      setError(String(err))
      setRedirect(false)
    }
    setLoading(false)
  }

  if (error) {
    return <div>{error}</div>
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          placeholder="username"
          onChange={e => changeUsername(e.target.value)}
          value={form.username}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
          placeholder="password"
          onChange={e => changePassword(e.target.value)}
          value={form.password}
        />
      </div>
      <div>
        <button onClick={handleLogin}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
