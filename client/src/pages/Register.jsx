import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { registerUser } from '../apis/user'
import { Box, Button, Heading, TextInput, Paragraph, Anchor } from 'grommet'

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
    if (form.username == '' || form.email == '' || form.password == '') {
      setError('Error: all fields are required');
      return;
    } else {
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
  }

  if (redirect) {
    return <Navigate to="/login" />
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
        <Heading margin="small" alignSelf="center">Register</Heading>
        { error && <Paragraph color="status-error" alignSelf="center">{error}</Paragraph> }
        <TextInput
          type="text"
          placeholder="Enter username..."
          id="username"
          value={form.username}
          onChange={e => changeUsername(e.target.value)}
        />
        <TextInput
          type="email"
          placeholder="Enter email..."
          id="email"
          value={form.email}
          onChange={e => changeEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Enter password..."
          id="password"
          value={form.password}
          onChange={e => changePassword(e.target.value)}
        />
        <Button
          primary
          hoverIndicator
          disabled={loading}
          label={loading ? 'Loading...' : 'Submit'}
          onClick={handleRegister}
        />
        <Paragraph margin="small" alignSelf="center">
          Already have an account? <Anchor href="/login" label="Login" />
        </Paragraph>
      </Box>
    </Box>
  )
}
