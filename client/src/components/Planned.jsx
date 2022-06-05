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
  Select,
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
  retrieveTasksGroupBy,
} from '../apis/task'
import CreateTask from './CreateTask'
import EditTask from './EditTask'
import Empty from './Empty'
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
        //   setReload(false)
      }
    })()
  }, [by, reload])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>{error}</div>
  }

  if (groups.length === 0) {
    return <Empty text="Wow, such empty!" />
  }

  return (
    <Box gridArea="pane" background="light-1">
      <Page
        style={{
          minHeight: '100vh',
        }}
      >
        {/* {showTask && (
            <EditTask
              setShow={setShowTask}
              task={selectedTask}
              reload={setReload}
            />
          )} */}
        <PageContent height="100%">
          <Box justify="between" direction="column" height="100%">
            <Box>
              <Box direction="row" align="center" justify="between">
                <Heading size="small">Planned</Heading>
                <Select
                  options={['day', 'month']}
                  value={by}
                  onChange={({ option }) => setBy(option)}
                />
              </Box>
              <Box>
                {/*  */}
                {groups &&
                  groups.map(group => (
                    <Box key={group}>
                      <Box margin="32px 0" width="30%">
                        <Text size="small">{group}</Text>
                      </Box>
                      <List
                        primaryKey="title"
                        data={tasks[group]}
                        children={(item, index, obj) => {
                          return (
                            <Box direction="row" key={index} justify="between">
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
                    </Box>
                  ))}

                {/*  */}
              </Box>
            </Box>
            {/* <CreateTask reload={() => setReload(prev => !prev)} /> */}
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}
