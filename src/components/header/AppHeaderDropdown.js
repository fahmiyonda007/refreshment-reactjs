import React from 'react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Navigate } from 'react-router-dom'
import AuthService from '../../services/auth.service'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const logOut = () => {
    AuthService.logout().then(() => {
      Navigate('/login')
    })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" status="success" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="/" onClick={logOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
