import axios from 'axios'

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
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService
