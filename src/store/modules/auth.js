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
  async loginUser ({ commit }, data) {
    try {
      console.log('data loginUser in auth.js: ', data.emailCopy)
      const email = data.emailCopy
      const password = data.passwordCopy
      const response = await axios.post(USER_URI + '/login', {email, password})
      await commit('setToken', response.data.token)
      console.log('Token from auth.js: ', response.data.token)
      console.log('userName from auth.js: ', response.data.userName)
      await commit('setUserName', response.data.userName)
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
  },
  async logoutUser ({ commit }, data) {
    try {
      // do not need to take in data, so logoutUser() should only take {commit}
      // all you need is to clear username and token by setting it to null.
      // must have await before commit()
      // await commit('setUserName', null)
      
//       console.log('in auth.js')
//       const username = data.username
//       const password = data.password
//       const token = data.token
//       console.log(username)
//       console.log(password)
//       console.log(token)
    } catch (error) {
      console.log('Error message from auth.js/verifyUser: ', error.message)
    }
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
