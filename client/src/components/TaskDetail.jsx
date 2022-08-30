import { Box, Text } from 'grommet'

const TaskDetail = props => {
  const { item } = props
  return (
    <Box>
      <Box margin="0 0 4px 0">
        <Text>{item.title}</Text>
      </Box>
      <Box direction="column" align="start">
        <Text size="xsmall">{item.description && item.description}</Text>
        {item.due_date && (
          <Text size="xsmall">Due date on {item.due_date.slice(0, -13)}</Text>
        )}
      </Box>
    </Box>
  )
}

export default TaskDetail
