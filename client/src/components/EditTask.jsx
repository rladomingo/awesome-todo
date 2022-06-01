import {
  Layer,
  Box,
  Button,
  Paragraph,
  TextInput,
  TextArea,
  DateInput,
  Select,
} from 'grommet'
import { useEffect, useState } from 'react'
import { retrieveMyCategories } from '../apis/category'
import { getTask, updateTodo } from '../apis/task'

export default function EditTask(props) {
  const { setShow, reload } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dueDate = props.task.due_date
    ? new Date(props.task.due_date)
    : new Date()
  const [task, setTask] = useState({
    ...props.task,
    due_date: dueDate.toISOString().slice(0, 10),
  })
  const [categories, setCategories] = useState([])

  const changeTitle = val => setTask(prev => ({ ...prev, title: val }))
  const changeDesc = val => setTask(prev => ({ ...prev, description: val }))
  const changeDue = val => setTask(prev => ({ ...prev, due_date: val }))
  const changeCat = option => {
    let catId
    if (option === 'all') {
      catId = null
    } else {
      catId = categories.filter(cat => cat.name === option)[0].cat_id
    }
    setTask(prev => ({ ...prev, cat_id: catId }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await updateTodo(
        task.task_id,
        task.title,
        task.description,
        task.due_date,
        task.cat_id
      )
      //   console.log(task)
      reload(prev => !prev)
      setShow(false)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  //   console.log(task)
  useEffect(() => {
    ;(async () => {
      try {
        setCategories(await retrieveMyCategories())
        setError(null)
      } catch (err) {
        setError(String(err))
      }
    })()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Layer
      onEsc={() => setShow(false)}
      onClickOutside={() => setShow(false)}
      style={{
        width: '50vh',
        padding: '16px',
      }}
    >
      <Paragraph size="large" textAlign="center">
        Are you sure you want to edit {task.title}?
      </Paragraph>
      <Box
        direction="column"
        gap="12px"
        align="stretch"
        justify="between"
        margin="16px 0"
      >
        <Box>
          <TextInput
            placeholder="Title"
            value={task.title}
            onChange={e => changeTitle(e.target.value)}
          />
        </Box>
        <Box>
          <TextArea
            placeholder="Description"
            value={task.description || ''}
            onChange={e => changeDesc(e.target.value)}
          />
        </Box>
        <Box>
          <DateInput
            format="mm/dd/yyyy"
            value={new Date(task.due_date).toISOString()}
            onChange={({ value }) => {
              const dueDate = value.slice(0, 10)
              changeDue(dueDate)
            }}
          />
        </Box>
        <Box>
          <Select
            options={[...categories.map(cat => cat.name), 'all']}
            value={
              categories.filter(cat => cat.cat_id === task.cat_id).length > 0
                ? categories.filter(cat => cat.cat_id === task.cat_id)[0].name
                : 'all'
            }
            onChange={({ option }) => {
              changeCat(option)
            }}
          />
        </Box>
      </Box>
      <Box direction="row" gap="8px" justify="between" align="center">
        <Box flex="grow">
          <Button
            hoverIndicator
            label="Cancel"
            onClick={() => {
              setShow(false)
            }}
            disabled={loading}
          />
        </Box>

        <Box flex="grow">
          <Button
            hoverIndicator
            label="Confirm"
            primary
            disabled={loading}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Layer>
  )
}
