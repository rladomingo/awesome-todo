import { Box, Button, Layer, Paragraph, TextInput } from 'grommet'
import { editCategory } from '../apis/category'
import { useState } from 'react'

export default function EditCategory(props) {
  const { exit, category, reload } = props
  const [cat, setCat] = useState(category)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const changeName = e => setCat(prev => ({ ...prev, name: e.target.value }))
  const handleSave = async () => {
    setLoading(true)
    try {
      // do save here
      await editCategory(cat.cat_id, cat.name)

      setError(null)
      reload()
      exit()
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Layer
      onClickOutside={exit}
      style={{
        width: '50vh',
        padding: '16px',
      }}
    >
      <Paragraph>Edit {category.name}</Paragraph>
      <Box direction="column" gap="12px" justify="between" align="stretch">
        <Box>
          <TextInput
            placeholder="Name"
            value={cat.name}
            onChange={changeName}
          />
        </Box>
        <Box direction="row" gap="16px">
          <Box flex="grow">
            <Button
              disabled={loading}
              secondary
              hoverIndicator
              label="Cancel"
              onClick={exit}
            />
          </Box>
          <Box flex="grow">
            <Button
              disabled={loading}
              primary
              hoverIndicator
              label={loading ? 'Loading...' : 'Save'}
              onClick={handleSave}
            />
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}
