import { getToken } from '../utils'

const baseUrl = 'http://localhost:8000/user'

export const loginUser = async (username, password) => {
  const res = await fetch(`${baseUrl}/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data.token
}

export const registerUser = async (username, email, password) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const getMyself = async userId => {
  const res = await fetch(`${baseUrl}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken}`,
    },
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}
