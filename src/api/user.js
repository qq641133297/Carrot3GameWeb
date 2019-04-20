import config from '../config'
let user = {}

let baseUrl = config.getApiBaseUrl() + '/user'
user = {
  login: data => {
    return window.$axios.post(`${baseUrl}/login`, data).then(res => res.data)
  },
  register: data => {
    return window.$axios.post(`${baseUrl}/register`, data).then(res => res.data)
  },
  getUserList: data => {
    return window.$axios.get(`${baseUrl}/userlist`).then(res => res.data)
  }
}
export default user
