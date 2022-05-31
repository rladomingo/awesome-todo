import { Sidebar as GrommetSidebar, Button, Nav } from 'grommet'
import { useEffect, useState } from 'react'
import { retrieveMyCategories } from '../apis/category'
import CreateCategory from './CreateCategory'
import Profile from './Profile'

export default function Sidebar(props) {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }, [])

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
      footer={<CreateCategory />}
    >
      <Nav gap="small">
        {categories &&
          categories.map(category => (
            <Button
              key={category.cat_id}
              primary
              hoverIndicator
              label={category.name}
            />
          ))}
      </Nav>
    </GrommetSidebar>
  )
}
