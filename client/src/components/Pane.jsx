import {
  Box,
  Heading,
  Page,
  PageContent,
  List,
  Text,
  CheckBox,
  Button,
  Footer,
} from 'grommet'
import { FormEdit, FormTrash } from 'grommet-icons'
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
import EditTask from './EditTask'
import Message from './Message'
import Loading from './Loading'
import TaskDetail from './TaskDetail'

export default function Pane(props) {
  const [todos, setTodos] = useState(null)
  const [category, setCategory] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { cat_id } = params
  const [reload, setReload] = useState(true)

  // modal to edit task
  const [showTask, setShowTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

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
    return <Loading />
  }

  if (error) {
    return <Message text={`Whoops, something went wrong. Please try again later. (${error})`} />
  }

  const isEmpty =
    todos.not_completed.length === 0 && todos.completed.length === 0

  return (
    <Box gridArea="pane" background="light-1">
      <Page
        style={{
          minHeight: '100vh',
        }}
      >
        {showTask && (
          <EditTask
            setShow={setShowTask}
            task={selectedTask}
            reload={setReload}
          />
        )}
        <PageContent height="100%">
          <Box justify="between" direction="column" height="100%">
            <Box overflow={{vertical: "scroll"}} height="100%" pad={{right: "10px"}}>
              {!isEmpty && (
                <Box>
                  {category && <Heading size="small">{category.name}</Heading>}
                  {!cat_id && <Heading size="small">All</Heading>}
                  <Box>
                    {todos.not_completed.length !== 0 && (
                        <Text size="medium" weight="bold"> {'To-do'.toUpperCase()} </Text>
                    )}
                    <List
                      primaryKey="title"
                      data={todos.not_completed}
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
                              <TaskDetail item={item} />
                            </Box>
                            <Box direction="row">
                              <Button
                                hoverIndicator
                                icon={<FormEdit />}
                                onClick={() => {
                                  setShowTask(true)
                                  setSelectedTask(item)
                                }}
                              />
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
                          </Box>
                        )
                      }}
                    />
                    {todos.completed.length !== 0 && (
                        <Text size="medium" weight="bold" margin={todos.not_completed.length == 0 ? '' : {top: 'medium'}}> {'Completed'.toUpperCase()} </Text>
                    )}
                    <List
                      primaryKey="title"
                      data={todos.completed}
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
              )}
              {isEmpty && <Message text="Wow, such empty!" />}
            </Box>
            <Footer>
              <CreateTask
                reload={() => setReload(prev => !prev)}
              />
            </Footer>
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
