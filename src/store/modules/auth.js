import axios from 'axios'
const state = {
  userName: null,
  token: null
}
const USER_URI = '/api/users'
const getters = {
  isAuthenticated: (state) => !!state.user,
  getUserName: (state) => state.userName,
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
    const response = await axios.post(USER_URI + '/', form)
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
  async loginUser ({ commit }, data) {
    const email = data.emailCopy
    const password = data.passwordCopy
    const response = await axios.post(USER_URI + '/login', { email, password })
    localStorage.setItem('userName', response.data.userName)
    localStorage.setItem('userToken', response.data.token)
    await commit('setToken', response.data.token)
    await commit('setUserName', response.data.userName)
    return response
  },
  async verifyUser ({ commit }, confirmationCode) {
    try {
      const response = await axios.get(USER_URI + '/verify/' + JSON.stringify(confirmationCode))
      return response
    } catch (error) {
      console.log('Error message from auth.js/verifyUser: ', error.message)
    }
  },
  async logoutUser ({ commit }) {
    try {
      await commit('setUserName', null)
      await commit('setToken', null)
      localStorage.removeItem('userName')
      localStorage.removeItem('userToken')
    } catch (error) {
      console.log('Error message from auth.js/logoutUser: ', error.message)
    }
  },
  async sendChangePasswordEmail ({ commit }, data) {
    await axios.post(USER_URI + '/reset', data)
    return
  },
  async changePassword ({ commit }, data) {
    await axios.put(USER_URI + '/ChangePassword/' + data._id, data)
  }

}
const mutations = {
  setUserName (state, username) {
    state.userName = username
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
