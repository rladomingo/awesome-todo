import {
  Sidebar as GrommetSidebar,
  Button,
  Nav,
  Box,
  Layer,
  Paragraph,
  Heading,
} from 'grommet'
import { useEffect, useState } from 'react'
import { deleteCategory, retrieveMyCategories } from '../apis/category'
import CreateCategory from './CreateCategory'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom'
import { FormEdit, FormTrash } from 'grommet-icons'
import EditCategory from './EditCategory'
import Loading from './Loading'

export default function Sidebar(props) {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

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
    return <Loading />
  }

  return (
    <>
      {showDelete && (
        <Layer
          onEsc={() => {
            setShowDelete(false)
            setSelectedCategory(null)
          }}
          onClickOutside={() => {
            setShowDelete(false)
            setSelectedCategory(null)
          }}
          style={{
            width: '50vh',
            // height: '30vh',
            padding: '16px',
          }}
        >
          <Paragraph size="large" textAlign="center">
            Are you sure you want to delete category {selectedCategory.name}?
          </Paragraph>
          <Box direction="row" gap="8px" justify="between" align="center">
            <Box flex="grow">
              <Button
                hoverIndicator
                label="Cancel"
                onClick={() => {
                  setShowDelete(false)
                  setSelectedCategory(null)
                }}
              />
            </Box>
            <Box flex="grow">
              <Button
                hoverIndicator
                label="Confirm"
                primary
                onClick={async () => {
                  try {
                    await deleteCategory(selectedCategory.cat_id)
                    setError(null)
                  } catch (err) {
                    setError(String(err))
                  } finally {
                    setSelectedCategory(null)
                    setShowDelete(false)
                    setRefresh(prev => ++prev)
                  }
                }}
              />
            </Box>
          </Box>
        </Layer>
      )}
      {showEdit && (
        <EditCategory
          exit={() => {
            setShowEdit(false)
            setSelectedCategory(null)
          }}
          category={selectedCategory}
          reload={() => setRefresh(prev => ++prev)}
        />
      )}
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
          <Button
            primary
            hoverIndicator
            label="Planned"
            onClick={() => {
              navigate(`/planned`)
            }}
          />
          {categories &&
            categories.map(category => (
              <Box
                key={category.cat_id}
                direction="row"
                justify="between"
                align="center"
              >
                <Box flex="grow">
                  <Button
                    primary
                    hoverIndicator
                    label={category.name}
                    onClick={() => {
                      navigate(`/${category.cat_id}`)
                    }}
                  />
                </Box>
                <Box flex="shrink">
                  <Button
                    icon={<FormEdit />}
                    hoverIndicator
                    onClick={() => {
                      setSelectedCategory(category)
                      setShowEdit(true)
                    }}
                  />
                </Box>
                <Box flex="shrink">
                  <Button
                    icon={<FormTrash />}
                    hoverIndicator
                    onClick={() => {
                      setShowDelete(true)
                      setSelectedCategory(category)
                    }}
                  />
                </Box>
              </Box>
            ))}
        </Nav>
      </GrommetSidebar>
    </>
  )
}
