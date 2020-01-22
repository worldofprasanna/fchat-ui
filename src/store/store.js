import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      UserName: '',
      ID: 0
    },
    current_user: localStorage.name || ''
  },
  mutations: {
    SET_USER(state, user) {
      state.User.UserName = user.UserName
      state.User.ID = user.ID
    },
    CLEAR_DATA(state) {
      state.User.UserName = ''
      state.User.ID = 0
      localStorage.name = ''
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    clearData({commit}) {
      commit('CLEAR_DATA')
    }
  },
  getters: {
    getUser: state => {
      return state.User
    },
    getCurrentUser: state => {
      return state.current_user
    }
  }
})
