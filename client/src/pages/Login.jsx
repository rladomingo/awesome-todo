import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../apis/user'
import { storeToken } from '../utils'
import { Box, Button, Heading, TextInput, Paragraph, Anchor } from 'grommet'

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

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <Box
      align="center"
      justify="center"
      height="100vh"
      background="brand"
    >
      <Box
        align="stretch"
        background="light-1"
        pad="16px"
        direction="column"
        gap="12px"
        width='30vw'
      >
        <Heading margin="small" alignSelf="center">Login</Heading>
        { error && <Paragraph color="status-error" alignSelf="center">{error}</Paragraph> }
        <TextInput
          type="text"
          id="username"
          placeholder="Enter username..."
          onChange={e => changeUsername(e.target.value)}
          value={form.username}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Enter password..."
          onChange={e => changePassword(e.target.value)}
          value={form.password}
        />
        <Button
          primary
          hoverIndicator
          disabled={loading}
          label={loading ? 'Loading...' : 'Submit'}
          onClick={handleLogin}
        />
        <Paragraph margin="small" alignSelf="center">
          Don't have an account? <Anchor href="/register" label="Register" />
        </Paragraph>
      </Box>
    </Box>
  )
}
