import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import _ from 'lodash'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import RoleService from '../../../services/role.service'

const RolesForm = (props) => {
  const form = useRef()
  const navigate = useNavigate()
  const params = useParams()
  const [roleName, setRoleName] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditMode, setIsEditMode] = useState(params.id === undefined ? false : true)

  // initial call
  useEffect(() => {
    if (isEditMode) {
      getData()
    }
  }, [])

  const getData = () => {
    RoleService.findRole(params.id).then(
      (res) => {
        setRoleName(res.data.name)
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        navigate('/roles')
      },
    )
  }

  const onChangeRoleName = (e) => {
    const name = e.target.value
    setRoleName(name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    if (isEditMode) {
      RoleService.updateRole(params.id, roleName).then(
        (res) => {
          setLoading(false)
          toast('Success', { type: toast.TYPE.INFO, autoClose: 3000 })
          navigate('/roles')
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
  
          setLoading(false)
          toast(resMessage, { type: toast.TYPE.ERROR, autoClose: 3000 })
        },
      )
    } else {
      RoleService.createRole(roleName).then(
        (res) => {
          setLoading(false)
          toast('Success', { type: toast.TYPE.INFO, autoClose: 3000 })
          navigate('/roles')
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
  
          setLoading(false)
          toast(resMessage, { type: toast.TYPE.ERROR, autoClose: 3000 })
        },
      )
    }
    }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <Link to="/roles">
              <CButton color="dark" variant="ghost">
                {'< Back'}
              </CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" ref={form}>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Role Name"
                  value={roleName}
                  onChange={onChangeRoleName}
                />
              </CCol>
              <CCol xs={12}>
                <div className="d-grid gap-6 d-md-flex justify-content-md-end">
                  <CButton
                    type="button"
                    color="success"
                    variant="outline"
                    className="me-md-2"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading && <span className="spinner-border spinner-border-sm"> </span>}
                    {!loading ? (!isEditMode ? 'Save' : 'Update') : 'Progress..'}
                  </CButton>
                  <CButton type="button" color="danger" variant="ghost" disabled={loading}>
                    Cancel
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RolesForm
