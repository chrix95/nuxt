import axios from 'axios'


export default (token) => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    headers: token
  })
}
