import { Sidebar as GrommetSidebar, Button, Nav } from 'grommet'
import { useEffect, useState } from 'react'
import { retrieveMyCategories } from '../apis/category'
import CreateCategory from './CreateCategory'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar(props) {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        setCategories(await retrieveMyCategories())
        setError(null)
      } catch (err) {
        setCategories(null)
        setError(String(err))
      } finally {
        setLoading(false)
      }
    })()
  }, [refresh])

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <GrommetSidebar
      background="brand"
      gridArea="sidebar"
      header={<Profile />}
      footer={<CreateCategory refresh={setRefresh} />}
    >
      <Nav gap="small">
        <Button
          primary
          hoverIndicator
          label="All tasks"
          onClick={() => {
            navigate(`/`)
          }}
        />
        {categories &&
          categories.map(category => (
            <Button
              key={category.cat_id}
              primary
              hoverIndicator
              label={category.name}
              onClick={() => {
                navigate(`/${category.cat_id}`)
              }}
            />
          ))}
      </Nav>
    </GrommetSidebar>
  )
}
