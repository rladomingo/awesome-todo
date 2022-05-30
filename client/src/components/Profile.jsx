import { Box, Avatar, Grid, Text } from 'grommet'

export default function Profile(props) {
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
        <Text size="small">juan.delacruz</Text>
        <Text size="xsmall">juan.delacruz@gmail.com</Text>
      </Box>
    </Grid>
  )
}
