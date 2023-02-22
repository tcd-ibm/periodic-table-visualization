import axios from 'axios'
const state = {
  user: null
}
const USER_URI = '/api/users'
const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user
}

const actions = {
  async registerUser ({ dispatch }, form) {
    const response = await axios.post(USER_URI + '/', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    // await dispatch('LogIn', UserForm)
    console.log('registerUser in auth.js is called')
    console.log('response: ', response)
    return response
  },
  async LoginUser ({commit}, User) {
    await axios.post('login', User)
    await commit('setUser', User.get('username'))
  }
}
const mutations = {
  setUser (state, username) {
    state.user = username
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
