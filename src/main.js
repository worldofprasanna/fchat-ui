import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false


/* Application initialize */
const vueApp = new Vue({
  router,
  components: {
    App
  },
  render: h => h(App)
})

vueApp.$mount('#app')

export default { vueApp }
