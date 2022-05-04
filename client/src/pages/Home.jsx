import { useState, useEffect } from 'react'
import { UserAPI } from '../api'
import { Navigate } from 'react-router-dom'

export default function Home(props) {
  const [me, setMe] = useState(null)
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await UserAPI.me()
      if (!res.status.includes('ok')) {
        // throw errror here
        // setError(res.msg)
        // setMe(null)
        setRedirect('/login')
        return
      } else {
        setError(null)
        setMe(res.data)
      }

      const res2 = await UserAPI.refreshToken()
      if (!res2.status.includes('ok')) {
        // thro w err
        // setError(res2.msg)
        setRedirect('/login')
        return
      }

      localStorage.setItem('token', res2.data.token)
    })()

    return () => {
      setMe(null)
      setError(null)
      setRedirect(null)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setRedirect('/login')
  }

  return (
    <div>
      you are now authenticated!
      {me && JSON.stringify(me)}
      {error && JSON.stringify(error)}
      {redirect && <Navigate to={redirect} />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
