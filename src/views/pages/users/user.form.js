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
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from 'src/services/auth.service'

// eslint-disable-next-line react/prop-types
const UsersForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const notify = () => toast('Wow so easy!')

  const toaster = useRef()
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

    AuthService.login(email, password).then(
      (res) => {
        notify()
        navigate('/users')
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
      },
    )
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <Link to="/users">
              <CButton color="dark" variant="ghost">
                {'< Back'}
              </CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" ref={form}>
              <CCol md={6}>
                <CFormInput type="text" id="fullname" label="Full Name" />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="email"
                  id="inputEmail4"
                  label="Email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="password"
                  id="inputPassword4"
                  label="Password"
                  value={password}
                  onChange={onChangePassword}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput type="password" label="Confirm Password" />
              </CCol>
              <CCol xs={12}>
                <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St" />
              </CCol>
              <CCol xs={12}>
                <CFormInput
                  id="inputAddress2"
                  label="Address 2"
                  placeholder="Apartment, studio, or floor"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput id="inputCity" label="City" />
              </CCol>
              <CCol md={4}>
                <CFormSelect id="inputState" label="State">
                  <option>Choose...</option>
                  <option>...</option>
                </CFormSelect>
              </CCol>
              <CCol md={2}>
                <CFormInput id="inputZip" label="Zip" />
              </CCol>
              <CCol xs={12}>
                <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
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
                  {/* <CToaster ref={toaster} push={showToast} placement="top-end" /> */}
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
