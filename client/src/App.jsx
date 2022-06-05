import { base, Grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import { Routes, Route, Link } from 'react-router-dom'
import { routes } from './routes'

const customTheme = deepMerge(base, {
  global: {
    colors: {
      brand: '#2f184b',
      white: '#f4effa',
      control: '#9b72cf',
      border: 'control',
      active: 'control',
      focus: 'control',
      icon: 'brand',
    },
  },
  button: {
    border: {
      radius: '2px',
    },
    transition: {
      timing: 'ease-out',
      duration: 0.3,
    },
  },
})

export default function App() {
  return (
    <Grommet theme={customTheme}>
      <div>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
    </Grommet>
  )
}
