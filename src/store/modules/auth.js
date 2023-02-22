import axios from 'axios'
const state = {
  user: null,
  token: null
}
const USER_URI = '/api/users'
const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
  getAuthToken: (state) => state.token
}

const actions = {
  async registerUser ({ dispatch }, form) {
    const response = await axios.post(USER_URI + '/', form)
    // let UserForm = new FormData()
    // UserForm.append('username', form.username)
    // UserForm.append('password', form.password)
    // console.log('registerUser in auth.js is called')
    // console.log('response: ', response)
    return response
  },
  async loginUser ({ commit }, form) {
    // console.log('loginUser in auth.js is called')
    const response = await axios.post(USER_URI + '/login', form)
    // console.log('auth.js loginUser response: ', response)
    commit('setToken', response.data.token)
    // console.log('state: token => ', response.data.token)
    return response
  }
}
const mutations = {
  setUser (state, username) {
    state.user = username
  },
  setToken (state, token) {
    state.token = token
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
