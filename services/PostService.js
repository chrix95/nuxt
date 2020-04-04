import Api from '@/services/Api'

export default {
  getPosts () {
    return Api().get('posts')
  },
  login (credentials) {
    return Api().post('auth/login', credentials)
  }
}
