import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      UserName: '',
      ID: 0
    },
    Messages: []
  },
  mutations: {
    SET_USER(state, user) {
      state.User.UserName = user.UserName
      state.User.ID = user.ID
    },
    PUSH_MESSAGE(state, message) {
      state.Messages.push(message)
      Vue.set(state, 'Messages', state.Messages)
    },
    STORE_MESSAGES(state, messages) {
      Vue.set(state, 'Messages', messages)
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    pushMessage({ commit }, message) {
      commit('PUSH_MESSAGE', message)
    },
    storeMessages({ commit }, messages) {
      commit('STORE_MESSAGES', messages)
    }
  },
  getters: {
    getUser: state => {
      return state.User
    },
    allMessages: state => {
      return state.Messages
    }
  }
})
