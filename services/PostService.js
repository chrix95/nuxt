import Api from '@/services/Api'

let token = localStorage.getItem('token')
let config =  {}
if (token) {
  config = {
    'Authorization': 'Bearer ' + JSON.parse(token) 
  }
}

export default {
  getPosts () {
    return Api(config).get('posts')
  },
  getPost (slug) {
    return Api(config).get('posts/' + slug)
  }
}
