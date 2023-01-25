import axios from 'axios'
import jwtDecode from 'jwt-decode'

const API_URL = 'http://localhost:3300/api/auth/'

const register = (name, email, password) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    password,
  })
}

const login = (username, password) => {
  return axios
    .post(API_URL + 'login', {
      username,
      password,
    })
    .then((response) => {
      const data = response.data
      if (data.token) {
        const res = [{ email: data.email, username: data.username, token: data.token }]
        localStorage.setItem('user', JSON.stringify(res[0]))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
  return axios.get(API_URL + 'logout').then((response) => {
    return response.data
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const useAuth = () => {
  const user = getCurrentUser()
  if (user) {
    const decodedJwt = jwtDecode(user.token)
    if (decodedJwt.exp * 1000 < Date.now()) {
      localStorage.removeItem('user')
      return false
    }
    return true
  } else {
    return false
  }
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  useAuth,
}

export default AuthService
