import {
  Box,
  Heading,
  Page,
  PageContent,
  List,
  Text,
  CheckBox,
  Button,
  Select,
} from 'grommet'
import { FormTrash } from 'grommet-icons'
import { useEffect, useState, Fragment } from 'react'
import {
  deleteTask,
  markTodoAsDone,
  retrieveTasksGroupBy,
} from '../apis/task'
import Message from './Message'
import Loading from './Loading'

export default function Pane(props) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [groups, setGroups] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [by, setBy] = useState('day')
  const [reload, setReload] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await retrieveTasksGroupBy(by)
        setGroups(Object.keys(res))
        setTasks(res)
        setError(null)
      } catch (err) {
        setError(String(err))
        setTasks(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [by, reload])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Message text={`Whoops, something went wrong. Please try again later. (${error})`} />
  }

  console.log(tasks)

  if (groups.length === 0) {
    return <Message text="Wow, such empty!" />
  }

  return (
    <Box gridArea="pane" background="light-1">
      <Page
        style={{
          minHeight: '100vh',
        }}
      >
        <PageContent height="100%">
          <Box justify="between" direction="column" height="100%">
            <Box direction="row" align="center" justify="between">
              <Heading size="small">Planned</Heading>
              <Select
                options={['day', 'month']}
                value={by}
                onChange={({ option }) => setBy(option)}
              />
            </Box>
            <Box overflow={{vertical: "scroll"}} height="100%" pad={{right: "10px"}}>
              <Box gap="medium">
                {groups &&
                  groups.map(group => (
                    <Fragment key={group}>
                      <Text size="medium" weight="bold">{group.toUpperCase()}</Text>
                      <List 
                        primaryKey="title"
                        data={tasks[group]}
                        children={(item, index, obj) => {
                          return (
                            <Box direction="row" key={index} justify="between" >
                              <Box direction="row" pad="xsmall" gap="16px">
                                <CheckBox
                                  name={item.title}
                                  checked={item.completed !== 0}
                                  onChange={async e => {
                                    try {
                                      await markTodoAsDone(
                                        item.task_id,
                                        !item.completed
                                      )
                                      setError(null)
                                      setReload(prev => !prev)
                                    } catch (err) {
                                      setError(String(err))
                                    }
                                  }}
                                />
                                <Text
                                  style={{
                                    textDecoration:
                                      item.completed === 0
                                        ? 'none'
                                        : 'line-through',
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
                    </Fragment>
                  ))}
              </Box>
            </Box>
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
