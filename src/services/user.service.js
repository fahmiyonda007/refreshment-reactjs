import axios from 'axios'

const API_URL = 'http://127.0.0.1:3100/api/users/'

const getCurrentUser = () => {
  return axios.get(API_URL + 'me').then((response) => {
    return response.data
  })
}

const getUsers = () => {
  return axios.get(API_URL + 'list').then((response) => {
    return response.data
  })
}

const UserService = {
  getCurrentUser,
  getUsers,
}

export default UserService
