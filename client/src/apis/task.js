import { getToken } from '../utils'
const baseUrl = 'http://localhost:8000/task'

export const retrieveAllTasks = async () => {
  const res = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const retrieveTasksByCat = async catId => {
  const res = await fetch(`${baseUrl}?cat_id=${catId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const markTodoAsDone = async (todoId, completed) => {
  const res = await fetch(`${baseUrl}/done/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ completed }),
  })

  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}
