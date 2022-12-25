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
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UsersForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useRef()

  const navigate = useNavigate()

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    _.debounce(toast('Success', { type: toast.TYPE.INFO, autoClose: 3000 }, 1000))
    navigate('/users')
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
                <CFormInput type="text" label="Role Name" />
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
                    {!loading ? 'Save' : 'Progress..'}
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

export default UsersForm
