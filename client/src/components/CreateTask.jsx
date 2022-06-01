import { Box, Button, TextInput } from 'grommet'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createTask } from '../apis/task'

export default function CreateTask(props) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { cat_id } = params

  const handleCreate = async () => {
    setLoading(true)
    try {
      await createTask(title, cat_id)
      setError(null)
      props.reload(true)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
      setTitle('')
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Box margin="12px 0">
      <Box margin="0 0 12px 0">
        <TextInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title..."
        />
      </Box>
      <Button
        primary
        hoverIndicator
        disabled={loading}
        label={loading ? 'Loading...' : 'Create'}
        onClick={handleCreate}
      />
    </Box>
  )
}
