import { Sidebar as GrommetSidebar, Button, Nav } from 'grommet'
import CreateCategory from './CreateCategory'
import Profile from './Profile'

export default function Sidebar(props) {
  return (
    <GrommetSidebar
      background="brand"
      gridArea="sidebar"
      header={<Profile />}
      footer={<CreateCategory />}
    >
      <Nav gap="small">
        <Button primary hoverIndicator label="Category 1" />
        <Button primary hoverIndicator label="Category 1" />
      </Nav>
    </GrommetSidebar>
  )
}
