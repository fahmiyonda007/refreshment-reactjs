import axios from 'axios'
import AuthService from './auth.service'

const API_URL = 'http://127.0.0.1:3100/api/users/'

const token = AuthService.getCurrentUser().access_token
const config = {
  headers: { Authorization: `Bearer ${token}` },
}

const getCurrentUser = () => {
  return axios.get(API_URL + 'me').then((response) => {
    return response.data
  })
}

const getUsers = (limit = 10, offset = 0, filter = '') => {
  return axios
    .get(API_URL + `list?limit=${limit}&offset=${offset}&name=${filter}`, config)
    .then((response) => {
      return response.data
    })
}

const UserService = {
  getCurrentUser,
  getUsers,
}

export default UserService
