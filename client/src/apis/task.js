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

export const getTask = async id => {
  const res = await fetch(`${baseUrl}/${id}`, {
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

export const deleteTask = async todoId => {
  const res = await fetch(`${baseUrl}/${todoId}`, {
    method: 'DELETE',
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

export const createTask = async (title, cat_id = null) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, cat_id }),
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const updateTodo = async (
  todoId,
  title,
  description,
  due_date,
  cat_id
) => {
  const res = await fetch(`${baseUrl}/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, description, due_date, cat_id }),
  })

  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const retrieveTasksGroupBy = async by => {
  const res = await fetch(`${baseUrl}?group_by=${by}`, {
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
