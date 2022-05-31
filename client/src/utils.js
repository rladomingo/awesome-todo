export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getToken = () => {
  return localStorage.getItem('token')
}

export const storeToken = token => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}
