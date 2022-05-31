import { Box, Avatar, Grid, Text } from 'grommet'
import { useState, useEffect } from 'react'
import { getMyself } from '../apis/user'

export default function Profile(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        setUser(await getMyself())
        setError(null)
      } catch (err) {
        setUser(null)
        setError(String(err))
      }
      setLoading(false)
    })()
  }, [])

  if (error) {
    return <div>{error}</div>
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
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
      </Box>
      <Box alignContent="center" justify="center" gridArea="info">
        <Text size="small">{user.username}</Text>
        <Text size="xsmall">{user.email}</Text>
      </Box>
    </Grid>
  )
}
