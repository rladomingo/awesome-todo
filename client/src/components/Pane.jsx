import {
  Box,
  Heading,
  Page,
  PageContent,
  List,
  RadioButton,
  Text,
  CheckBox,
} from 'grommet'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveACategory } from '../apis/category'
import {
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
  const [refresh, setRefresh] = useState(0)

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
      }
    })()
  }, [cat_id, refresh])

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
                  <Box direction="row" key={index} pad="xsmall" gap="16px">
                    <CheckBox
                      name={item.title}
                      checked={item.completed !== 0}
                      onChange={async e => {
                        await markTodoAsDone(item.task_id, 1)
                        setRefresh(prev => ++prev)
                      }}
                    />
                    <Text>{item.title}</Text>
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
                  <Box direction="row" key={index} pad="xsmall" gap="16px">
                    <CheckBox
                      name={item.title}
                      checked={item.completed !== 0}
                      onChange={async e => {
                        await markTodoAsDone(item.task_id, 0)
                        setRefresh(prev => ++prev)
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
                )
              }}
            />
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
