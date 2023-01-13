import axios from 'axios'
import AuthService from './auth.service'

const API_URL = 'http://localhost:3300/api/users/'

const token = AuthService.getCurrentUser().token
const config = {
  headers: { Authorization: `Bearer ${token}` },
}

const getCurrentUser = () => {
  return axios.get(API_URL + 'me').then((response) => {
    return response.data
  })
}

const getUsers = (page = 1, take = 10, filter = '') => {
  return axios
    .get(API_URL + `?page=${page}&take=${take}&filter=${filter}`, config)
    .then((response) => {
      return response.data
    })
}

const UserService = {
  getCurrentUser,
  getUsers,
}

export default UserService
