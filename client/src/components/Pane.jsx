import {
  Box,
  Heading,
  Page,
  PageContent,
  List,
  RadioButton,
  Text,
  CheckBox,
  Button,
} from 'grommet'
import { FormTrash } from 'grommet-icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveACategory } from '../apis/category'
import {
  deleteTask,
  markTodoAsDone,
  retrieveAllTasks,
  retrieveTasksByCat,
} from '../apis/task'

export default function Pane(props) {
  const [todos, setTodos] = useState(null)
  const [category, setCategory] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { cat_id } = params
  const [catId, setCatid] = useState(cat_id)

  useEffect(() => {
    ;(async () => {
      try {
        if (cat_id) {
          setTodos(await retrieveTasksByCat(catId))
          setCategory(await retrieveACategory(catId))
        } else {
          setCategory(null)
          setTodos(await retrieveAllTasks())
        }
        setError(null)
      } catch (err) {
        setError(String(err))
        setTodos(null)
      } finally {
        setLoading(false)
        setCatid(null)
      }
    })()
  }, [catId])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Box gridArea="pane" background="light-1">
      <Page>
        <PageContent>
          <Box>
            {category && <Heading size="small">{category.name}</Heading>}
            {!cat_id && <Heading size="small">All</Heading>}
          </Box>
          <Box>
            <List
              primaryKey="title"
              data={todos.filter(todo => !todo.completed)}
              children={(item, index, obj) => {
                return (
                  <Box direction="row" justify="between">
                    <Box direction="row" key={index} pad="xsmall" gap="16px">
                      <CheckBox
                        name={item.title}
                        checked={item.completed !== 0}
                        onChange={async e => {
                          try {
                            await markTodoAsDone(item.task_id, 1)
                            setError(null)
                            setCatid(cat_id)
                          } catch (err) {
                            setError(String(err))
                          }
                        }}
                      />
                      <Text>{item.title}</Text>
                    </Box>
                    <Button
                      hoverIndicator
                      icon={<FormTrash />}
                      onClick={async () => {
                        try {
                          setLoading(true)
                          await deleteTask(item.task_id)
                          setCatid(cat_id)
                          setError(null)
                          setLoading(false)
                        } catch (err) {
                          setError(String(err))
                        }
                      }}
                    />
                  </Box>
                )
              }}
            />
          </Box>
          <Box margin="32px 0" width="30%">
            <Text size="small">Completed</Text>
          </Box>
          <Box>
            <List
              primaryKey="title"
              data={todos.filter(todo => todo.completed)}
              children={(item, index, obj) => {
                return (
                  <Box direction="row" key={index} justify="between">
                    <Box direction="row" pad="xsmall" gap="16px">
                      <CheckBox
                        name={item.title}
                        checked={item.completed !== 0}
                        onChange={async e => {
                          try {
                            await markTodoAsDone(item.task_id, 0)
                            setError(null)
                            setCatid(cat_id)
                          } catch (err) {
                            setError(String(err))
                          }
                        }}
                      />
                      <Text
                        style={{
                          textDecoration: 'line-through',
                        }}
                      >
                        {item.title}
                      </Text>
                    </Box>
                    <Button
                      icon={<FormTrash />}
                      hoverIndicator
                      onClick={async () => {
                        try {
                          setLoading(true)
                          await deleteTask(item.task_id)
                          setCatid(cat_id)
                          setError(null)
                          setLoading(false)
                        } catch (err) {
                          setError(String(err))
                        }
                      }}
                    />
                  </Box>
                )
              }}
            />
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
