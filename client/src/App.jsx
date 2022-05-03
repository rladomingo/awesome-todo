import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [response, setResponse] = useState()

  const fetchUsersPing = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/users/ping')
      const json = await res.json()
      setResponse(json)
      // throw new Error('testing')
    } catch(err) {
      throw err
    }
  }

  useEffect(() => {
    fetchUsersPing()
  }, [])


  return (
    <div className="App">
      {response && JSON.stringify(response)}
    </div>
  )
  
}

export default App
