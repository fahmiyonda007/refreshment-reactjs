import axios from 'axios'
import AuthService from './auth.service'

const API_URL = `http://127.0.0.1:3100/api/roles/`

const token = AuthService.getCurrentUser().access_token
const config = {
  headers: { Authorization: `Bearer ${token}` },
}

const createRole = (roleName) => {
  const request = { name: roleName }
  return axios.post(API_URL + `create`, request, config).then((response) => {
    return response.data
  })
}

const updateRole = (roleId, roleName) => {
  const request = { name: roleName }
  return axios.patch(API_URL + `update/${roleId}`, request, config).then((response) => {
    return response.data
  })
}

const deleteRoles = (roleId) => {
  return axios.delete(API_URL + `delete/${roleId}`, config).then((response) => {
    return response.data
  })
}

const getRoles = (limit = 10, offset = 0, filter = '') => {
  return axios
    .get(API_URL + `list?limit=${limit}&offset=${offset}&filter=${filter}`, config)
    .then((response) => {
      return response.data
    })
}

const findRole = (roleId) => {
  return axios.get(API_URL + `find/id/${roleId}`, config).then((response) => {
    return response.data
  })
}

const RoleService = {
  getRoles,
  findRole,
  createRole,
  updateRole,
  deleteRoles,
}

export default RoleService
