import { Grid } from 'grommet'

import Sidebar from '../components/Sidebar'
import Pane from '../components/Pane'

export default function Home(props) {
  return (
    <Grid
      fill={true}
      rows={['100vh']}
      columns={['30%', '70%']}
      areas={[
        { name: 'sidebar', start: [0, 0], end: [0, 0] },
        { name: 'pane', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Sidebar />

      <Pane />
    </Grid>
  )
}
