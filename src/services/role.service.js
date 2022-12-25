import axios from 'axios'
import AuthService from './auth.service'

const API_URL = `http://127.0.0.1:3100/api/roles/`

const token = AuthService.getCurrentUser().access_token
const config = {
  headers: { Authorization: `Bearer ${token}` },
}

const getRoles = (limit = 10, offset = 0, filter = '') => {
  return axios
    .get(API_URL + `list?limit=${limit}&offset=${offset}&filter=${filter}`, config)
    .then((response) => {
      return response.data
    })
}

const UserService = {
  getRoles,
}

export default UserService
