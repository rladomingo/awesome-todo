import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

export const routes = [
  {
    path: '/register',
    element: Register,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/',
    element: Home,
  },
  {
    path: '/:cat_id',
    element: Home,
  },
]
