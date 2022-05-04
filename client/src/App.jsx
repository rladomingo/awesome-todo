import { Routes, Route, Link } from 'react-router-dom'
import { routes } from './routes'

export default function App() {
  return (
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
  )
}
