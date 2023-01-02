import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// users
const User = React.lazy(() => import('./views/pages/users/user.index'))
const UserForm = React.lazy(() => import('./views/pages/users/user.form'))

// users
const Role = React.lazy(() => import('./views/pages/roles/role.index'))
const RoleForm = React.lazy(() => import('./views/pages/roles/role.form'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: User, exact: true },
  { path: '/users/form', name: 'Users Form', element: UserForm },
  { path: '/roles', name: 'Roles', element: Role, exact: true },
  { path: '/roles/form/:id?', name: 'Roles Form', element: RoleForm },
]

export default routes
