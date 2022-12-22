import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilSpeedometer,
  cilList,
  cilPregnant,
  cilRain,
  cilRecycle,
  cilRoom,
} from '@coreui/icons'
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
    name: 'Setup',
  },
  {
    component: CNavGroup,
    name: 'Administration',
    to: '/administration',
    // icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilRain} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Roles',
        to: '/roles',
        icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Permissions',
        to: '/permissions',
        icon: <CIcon icon={cilPregnant} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Core Menu',
        to: '/menu',
        icon: <CIcon icon={cilRecycle} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
