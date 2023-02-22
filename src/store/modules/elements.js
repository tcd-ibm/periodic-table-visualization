import axios from 'axios'
const ELEMENT_URI = '/api/elements'
const state = require('../../assets/data/mendelable.json')
const mutations = {}
const actions = {
  async getElements ({ commit }, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(ELEMENT_URI, config)
    console.log(response.data)
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
