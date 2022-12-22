import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSpeedometer, cilList } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Administration',
  },
  {
    component: CNavGroup,
    name: 'Administration',
    to: '/administration',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Roles',
        to: '/roles',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
