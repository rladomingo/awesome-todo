import { Box, Spinner } from 'grommet'

export default function Loading({ size = 'large' }) {
  return (
    <Box justify="center" align="center" height="100vh" width="100vw">
      <Spinner size={size} />
    </Box>
  )
}
