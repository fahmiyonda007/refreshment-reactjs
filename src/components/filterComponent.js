import { CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const FilterComponent = (props) => {
  const { onFilter } = props

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CInputGroup className="mb-3">
            {/* <CInputGroupText id="basic-addon1">@</CInputGroupText> */}
            <CFormInput
              type="text"
              className="form-control form-control-sm"
              id="search"
              placeholder="Search"
              onChange={onFilter}
            />
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

FilterComponent.propTypes = {
  onFilter: PropTypes.func,
}

export default FilterComponent
