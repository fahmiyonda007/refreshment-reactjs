/* eslint-disable react/prop-types */
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import _ from 'lodash'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FilterComponent from 'src/components/filterComponent'
import UserService from 'src/services/user.service'

const Users = (e) => {
  const [totalData, setTotalData] = useState(0)
  const [loading, setLoading] = useState(true)
  const [datas, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [deleteData, setDeleteData] = useState({
    visible: false,
    userId: '',
  })

  const columns = [
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Action',
      button: true,
      width: 'fit-content',
      cell: (cell) => (
        <div className="d-grid gap-6 d-md-flex">
          <Link to={{ pathname: `/users/form/${cell.id}` }}>
            <CButton color="warning" size="sm" className="me-md-2" variant="ghost">
              Edit
            </CButton>
          </Link>
          <CButton
            color="danger"
            size="sm"
            variant="ghost"
            onClick={() => setDeleteData({ visible: !deleteData.visible, userId: cell.id })}
          >
            Delete
          </CButton>
        </div>
      ),
    },
  ]

  // initial call
  React.useEffect(() => {
    getUsers()
  }, [])

  const getUsers = (page, take, filter) => {
    UserService.getUsers(page, take, filter).then(
      (res) => {
        setData(res.data)
        setTotalData(res.meta.itemCount)
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
    const take = perPage
    getUsers(page, take, filterText)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    const take = newPerPage
    getUsers(page, take, filterText)
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
      const take = perPage
      getUsers(1, take, e.target.value)
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
