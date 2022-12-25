import React from 'react'
import { CButton, CCol } from '@coreui/react'
import { Link } from 'react-router-dom'

const columns = [
  {
    name: 'name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Action',
    button: true,
    width: 'fit-content',
    cell: () => (
      <div className="d-grid gap-6 d-md-flex">
        <Link to="/roles/form">
          <CButton color="warning" size="sm" className="me-md-2" variant="ghost">
            Edit
          </CButton>
        </Link>
        <CButton color="danger" size="sm" variant="ghost">
          Delete
        </CButton>
      </div>
    ),
  },
]

export default columns
