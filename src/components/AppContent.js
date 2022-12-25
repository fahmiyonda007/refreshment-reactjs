import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '../services/auth.service'

// routes config
import routes from '../routes'

const useAuth = () => {
  const user = AuthService.getCurrentUser()
  if (user) {
    return true
  } else {
    return false
  }
}

const AppContent = () => {
  const auth = useAuth()

  return auth ? (
    <CContainer lg>
      <ToastContainer />

      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  ) : (
    <Navigate to="/login" />
  )
}

export default React.memo(AppContent)
