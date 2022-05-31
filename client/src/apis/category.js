import { getToken } from '../utils'
const baseUrl = 'http://localhost:8000/category'

export const createCategory = async name => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name }),
  })
  const json = await res.json()
  if (json.status !== 'success') {
    throw new Error(json.message)
  }
  return json.data
}

export const retrieveMyCategories = async () => {
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

export const retrieveACategory = async catId => {
  const res = await fetch(`${baseUrl}/${catId}`, {
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
