const BASE_API_URI = 'http://localhost:8000/api/v1'

const REST_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}

const endpoints = {
  userHealthCheck: `${BASE_API_URI}/users/ping`,
  userRegiser: `${BASE_API_URI}/users/register`,
  userLogin: `${BASE_API_URI}/users/login`,
  userMe: `${BASE_API_URI}/users/me`,
  userRefreshToken: `${BASE_API_URI}/users/refresh_token`,
}

export class UserAPI {
  static async checkHealth() {
    try {
      const res = await fetch(endpoints.userHealthCheck)
      const json = await res.json()
      return json
    } catch (err) {
      throw err
    }
  }
  static async register(username, email, password) {
    try {
      const res = await fetch(endpoints.userRegiser, {
        method: 'POST',
        headers: REST_HEADERS,
        body: JSON.stringify({ username, email, password }),
      })
      const json = await res.json()
      return json
    } catch (err) {
      throw err
    }
  }
  static async login(username = null, email = null, password) {
    try {
      let data = {}
      if (username && !email) {
        data = {
          username,
          password,
        }
      } else if (!username && email) {
        data = {
          email,
          password,
        }
      } else {
        throw new Error('No username/email!')
      }
      const res = await fetch(endpoints.userLogin, {
        method: 'POST',
        headers: REST_HEADERS,
        body: JSON.stringify(data),
      })
      return await res.json()
    } catch (err) {
      throw err
    }
  }
  static async me() {
    try {
      const res = await fetch(endpoints.userMe, {
        headers: REST_HEADERS,
      })
      return await res.json()
    } catch (err) {
      throw err
    }
  }
  static async refreshToken() {
    try {
      const res = await fetch(endpoints.userRefreshToken, {
        method: 'POST',
        headers: REST_HEADERS,
      })
      return await res.json()
    } catch (err) {
      throw err
    }
  }
}
