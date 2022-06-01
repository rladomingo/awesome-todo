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
import CreateTask from './CreateTask'

export default function Pane(props) {
  const [todos, setTodos] = useState(null)
  const [category, setCategory] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { cat_id } = params
  const [reload, setReload] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        if (cat_id) {
          setTodos(await retrieveTasksByCat(cat_id))
          setCategory(await retrieveACategory(cat_id))
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
        setReload(false)
      }
    })()
  }, [cat_id, reload])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Box gridArea="pane" background="light-1">
      <Page height="100vh">
        <PageContent height="100%">
          <Box justify="between" direction="column" height="100%">
            <Box>
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
                        <Box
                          direction="row"
                          key={index}
                          pad="xsmall"
                          gap="16px"
                        >
                          <CheckBox
                            name={item.title}
                            checked={item.completed !== 0}
                            onChange={async e => {
                              try {
                                await markTodoAsDone(item.task_id, 1)
                                setError(null)
                                setReload(prev => !prev)
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
                              await deleteTask(item.task_id)
                              setError(null)
                              setReload(prev => !prev)
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
                                setReload(prev => !prev)
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
                              await deleteTask(item.task_id)
                              setError(null)
                              setReload(prev => !prev)
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
            </Box>
            <CreateTask reload={() => setReload(prev => !prev)} />
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
