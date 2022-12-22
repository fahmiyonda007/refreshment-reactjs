import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// users
const User = React.lazy(() => import('./views/users/user.index'))
const UserForm = React.lazy(() => import('./views/users/user.form'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: User, exact: true },
  { path: '/users/form', name: 'Users Form', element: UserForm },
]

export default routes
