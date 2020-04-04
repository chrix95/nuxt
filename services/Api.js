import axios from 'axios'

let token = localStorage.getItem('token')
let config =  {}
if (token) {
  config = {
    'Authorization': 'Bearer ' + JSON.parse(token) 
  }
}

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    headers: config
  })
}
