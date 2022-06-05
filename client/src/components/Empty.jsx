import { Box, Text } from 'grommet'
import { Gremlin } from 'grommet-icons'

export default function Empty({ text }) {
  return (
    <Box height="100vh" width="100vw" align="center" justify="center">
      <Box margin="16px 0">
        <Gremlin size="medium" color="brand" />
      </Box>
      <Text>{text}</Text>
    </Box>
  )
}
