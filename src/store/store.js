import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      UserName: '',
      ID: 0
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.User.UserName = user.UserName
      state.User.ID = user.ID
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    }
  },
  getters: {
    getUser: state => {
      return state.User
    }
  }
})
