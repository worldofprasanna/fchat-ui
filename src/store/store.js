import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      UserName: '',
      ID: 0
    },
    Messages: [],
    current_user: localStorage.name || '',
    UserList: []
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
    },
    CLEAR_DATA(state) {
      state.User.UserName = ''
      state.User.ID = 0
      localStorage.name = ''
    },
    SET_USER_LIST(state, payload) {
      Vue.set(state, 'UserList', payload)
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
    },
    clearData({commit}) {
      commit('CLEAR_DATA')
    },
    setUserList({commit}, payload) {
      commit('SET_USER_LIST', payload)
    }
  },
  getters: {
    getUser: state => {
      return state.User
    },
    allMessages: state => {
      return state.Messages
    },
    getCurrentUser: state => {
      return state.current_user
    },
    getUserList: state => {
      return state.UserList
    }
  }
})
