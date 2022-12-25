/* eslint-disable react/prop-types */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import _ from 'lodash'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserService from 'src/services/user.service'
import columns from './user.columns'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
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

const Users = (e) => {
  const [totalData, setTotalData] = useState(0)
  const [loading, setLoading] = useState(true)
  const [datas, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  // initial call
  React.useEffect(() => {
    getUsers()
  }, [])

  const getUsers = (limit, offset, filter) => {
    UserService.getUsers(limit, offset, filter).then(
      (res) => {
        setData(res.data)
        setTotalData(res.meta.total)
        setLoading(false)
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        toast(resMessage, { theme: 'colored', type: 'error' })
        setLoading(false)
      },
    )
  }

  const handlePageChange = (page) => {
    setLoading(true)
    const limit = perPage
    const offset = page * limit - limit
    getUsers(limit, offset, filterText)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    const limit = newPerPage
    const offset = page * limit - limit
    getUsers(limit, offset, filterText)
    setPerPage(newPerPage)
  }

  //checkbox
  const handleChange = ({ selectedRows }) => {
    // console.log('Selected Rows: ', selectedRows)
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    const handleFilter = (e) => {
      const limit = perPage
      const offset = 1 * limit - limit
      getUsers(limit, offset, e.target.value)
      setFilterText(e.target.value)
    }

    return <FilterComponent onFilter={_.debounce(handleFilter, 500)} onClear={handleClear} />
  }, [filterText, resetPaginationToggle, perPage])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/users/form">
                <CButton color="info" variant="outline">
                  {'ADD'}
                </CButton>
              </Link>
            </div>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small"></p>
            <DataTable
              title="Users List"
              columns={columns}
              data={datas}
              paginationTotalRows={totalData}
              defaultSortFieldId={2}
              progressPending={loading}
              paginationResetDefaultPage={resetPaginationToggle}
              subHeaderComponent={subHeaderComponentMemo}
              fixedHeaderScrollHeight={'300px'}
              paginationRowsPerPageOptions={[10, 50, 100, 500]}
              onSelectedRowsChange={handleChange}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              striped
              selectableRows
              dense
              noHeader
              subHeader
              persistTableHead
              highlightOnHover
              fixedHeader
              pagination
              paginationServer
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
