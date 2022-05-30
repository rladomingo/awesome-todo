import {
  Box,
  Button,
  Heading,
  Page,
  PageContent,
  List,
  RadioButton,
  Text,
} from 'grommet'
import { useState } from 'react'

export default function Pane(props) {
  const [todos, setTodos] = useState([
    { title: 'todo 1', description: 'hello there', completed: false },
    { title: 'todo 2', description: 'hello there', completed: true },
    { title: 'twodo 3', description: 'hello there', completed: false },
    { title: 'twodo 4', description: 'hello there', completed: true },
  ])

  return (
    <Box gridArea="pane" background="light-1">
      <Page>
        <PageContent>
          <Box>
            <Heading size="small">This is a category</Heading>
          </Box>
          <Box>
            <List
              primaryKey="title"
              data={todos.filter(todo => !todo.completed)}
              children={(item, index, obj) => {
                return (
                  <Box direction="row" key={index} pad="xsmall" gap="16px">
                    <RadioButton
                      name={item.title}
                      checked={item.completed}
                      onChange={e => () => {}}
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
                    <RadioButton
                      name={item.title}
                      checked={item.completed}
                      onChange={e => () => {}}
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
