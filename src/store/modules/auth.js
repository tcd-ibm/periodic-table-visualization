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
  /**
   * @description Send HTTPS post request to the backend
   * @route POST /api/users/register
   * @author Nuoxi Zhang
   * @nuoxiz
   * @param {*} param0
   * @param {*} form
   * @returns Newly registered user's data
   */
  async registerUser ({ commit }, form) {
    console.log('data: ', form)
    const response = await axios.post(USER_URI + '/', form)
    console.log('auth.js/registerUser response object => ', response)
    return response
  },
  /**
   * @description Login user and store the token to Vuex
   * @author Nuoxi Zhang
   * @nuoxiz
   * @param {*} param0
   * @param {*} form
   * @returns User's data
   */
  async loginUser ({ commit }, form) {
    try {
      const response = await axios.post(USER_URI + '/login', form)
      commit('setToken', response.data.token)
      return response
    } catch (error) {
      console.log('Error message from auth.js/loginUser/: ', error.message)
    }
  },
  async verifyUser ({ commit }, confirmationCode) {
    try {
      console.log('confirmationCode: ', confirmationCode)
      console.log('type of confirmationCode: ', typeof (confirmationCode))
      const response = await axios.get(USER_URI + '/verify/' + JSON.stringify(confirmationCode))
      // console.log('verifyUser in auth.js is called')
      return response
    } catch (error) {
      console.log('Error message from auth.js/verifyUser: ', error.message)
    }
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
