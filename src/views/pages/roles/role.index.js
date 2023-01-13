/* eslint-disable react/prop-types */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import _ from 'lodash'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import RoleService from 'src/services/role.service'
import FilterComponent from 'src/components/filterComponent'
import ModalComponent from 'src/components/modalComponent'

const Roles = (e) => {
  const [totalData, setTotalData] = useState(0)
  const [loading, setLoading] = useState(true)
  const [datas, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [deleteData, setDeleteData] = useState({
    visible: false,
    roleId: '',
  })

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
      cell: (cell) => (
        <div className="d-grid gap-6 d-md-flex">
          <Link to={{ pathname: `/roles/form/${cell.id}` }}>
            <CButton color="warning" size="sm" className="me-md-2" variant="ghost">
              Edit
            </CButton>
          </Link>
          <CButton
            color="danger"
            size="sm"
            variant="ghost"
            onClick={() => setDeleteData({ visible: !deleteData.visible, roleId: cell.id })}
          >
            Delete
          </CButton>
        </div>
      ),
    },
  ]

  // initial call
  React.useEffect(() => {
    getData()
  }, [])

  const getData = (limit, offset, filter) => {
    RoleService.getRoles(limit, offset, filter).then(
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
    getData(limit, offset, filterText)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    const limit = newPerPage
    const offset = page * limit - limit
    getData(limit, offset, filterText)
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
      getData(limit, offset, e.target.value)
      setFilterText(e.target.value)
    }

    const handleDelete = (e, roleId) => {
      e.preventDefault()

      RoleService.deleteRoles(roleId).then(
        (res) => {
          toast('Success', { type: toast.TYPE.INFO, autoClose: 3000 })
          getData()
          setDeleteData({ visible: false, roleId: '' })
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()

          toast(resMessage, { type: toast.TYPE.ERROR, autoClose: 3000 })
          setDeleteData({ visible: false, roleId: '' })
        },
      )
    }

    return <FilterComponent onFilter={_.debounce(handleFilter, 500)} onClear={handleClear} />
  }, [filterText, resetPaginationToggle, perPage])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/roles/form">
                <CButton color="info" variant="outline">
                  {'ADD'}
                </CButton>
              </Link>
            </div>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small"></p>
            <DataTable
              title="Roles List"
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

export default Roles
