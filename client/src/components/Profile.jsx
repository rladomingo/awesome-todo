import { Box, Avatar, Grid, Text } from 'grommet'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getMyself } from '../apis/user'
import { removeToken } from '../utils'

export default function Profile(props) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setUser(await getMyself())
        setRedirect(false)
      } catch (err) {
        setUser(null)
        setRedirect(true)
      }
      setLoading(false)
    })()
  }, [])

  const handleLogout = () => {
    setLoading(true)
    removeToken()
    setUser(null)
    setLoading(false)
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Grid
      rows={['100%']}
      columns={['20%', '80%']}
      gap="small"
      areas={[
        { name: 'avatar', start: [0, 0], end: [0, 0] },
        { name: 'info', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box gridArea="avatar">
        <Avatar background="control">
          <Text>{user.username[0].toUpperCase()}</Text>
        </Avatar>
      </Box>
      <Box alignContent="center" justify="center" gridArea="info">
        <Text size="small">{user.username}</Text>
        <Text size="xsmall">{user.email}</Text>
        <Text
          size="xsmall"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleLogout}
        >
          {loading ? 'Loading...' : 'Logout'}
        </Text>
      </Box>
    </Grid>
  )
}
