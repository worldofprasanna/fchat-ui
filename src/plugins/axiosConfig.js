import axios from 'axios'
import app from '../main'
import Vue from 'vue'
import router from '@/router'

Vue.prototype.$http = axios
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : 'http://localhost:3000/api'
axios.defaults.withCredentials = true
axios.defaults.headers.Accept = 'application/json'
axios.defaults.headers.X_REQUESTED_WITH = 'XMLHttpRequest'

const renderLogin = () => {
  app.vueApp.$store.dispatch('resetLogin')
  router.push('/login')
}

const restrictedPage = () => {
  Vue.toasted.global.error('Page access restricted. Please contact admin.', { type: 'error' })
  router.push('/')
}

const pageNotFound = () => {
  router.replace('/Not-Found-404')
}

const somethingWrong = () => {
  Vue.toasted.global.error('Something went wrong. Please retry.', { type: 'error' })
}

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    if (error.config.hasOwnProperty('handleErrors') && !error.config.handleErrors) {
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      renderLogin()
    } else if (error.response.status === 403) {
      restrictedPage()
    } else if (error.response.status === 404) {
      pageNotFound()
    } else if (error.response.status === 422) {
      // These are validation errors from backend, just ignore it.
    } else {
      somethingWrong()
    }
  }
)
