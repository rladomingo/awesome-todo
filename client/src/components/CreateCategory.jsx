import { Box, Button, TextInput } from 'grommet'
import { useState } from 'react'
import { createCategory } from '../apis/category'
import { delay } from '../utils'

export default function CreateCategory({ refresh }) {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Box>
      <Box margin="0 0 16px 0">
        <TextInput
          placeholder="Enter category name..."
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </Box>
      <Button
        onClick={async () => {
          setLoading(true)

          /// do create category here
          // await delay(2000)
          try {
            await createCategory(category)
            refresh()
          } catch (err) {
            setError(String(err))
          }

          setCategory('')
          setLoading(false)
        }}
        secondary
        hoverIndicator
        disabled={category === ''}
        label={loading ? 'Loading...' : 'Create category'}
      />
    </Box>
  )
}
