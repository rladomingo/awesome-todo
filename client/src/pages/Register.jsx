import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { registerUser } from '../apis/user'

export default function Register(props) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)

  const changeUsername = val => setForm(prev => ({ ...prev, username: val }))
  const changeEmail = val => setForm(prev => ({ ...prev, email: val }))
  const changePassword = val => setForm(prev => ({ ...prev, password: val }))

  const handleRegister = async () => {
    try {
      setLoading(true)
      await registerUser(form.username, form.email, form.password)
      setError(null)
      setLoading(false)
      setRedirect(true)
    } catch (err) {
      setError(String(err))
      setLoading(false)
      setRedirect(false)
    } finally {
      setForm({
        username: '',
        email: '',
        password: '',
      })
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  if (redirect) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="username"
          id="username"
          value={form.username}
          onChange={e => changeUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          placeholder="email"
          id="email"
          value={form.email}
          onChange={e => changeEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          placeholder="password"
          id="password"
          value={form.password}
          onChange={e => changePassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegister}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </div>
    </div>
  )
}
