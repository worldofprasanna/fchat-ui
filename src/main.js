import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'

import globals from './globals'
import Popper from 'popper.js'

import store from './store/store'

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
Vue.prototype.$http = axios

Vue.use(Vuex)

Vue.use(BootstrapVue)

// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
