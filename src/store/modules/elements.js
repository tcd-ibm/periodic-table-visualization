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
  },
  async createElements ({ commit }, data) {
    console.log('createElements in element.js is called')
    const token = data.token
    const element = data.element

    console.log('token in elements.js:', token)
    console.log('element data in elements.js:', element)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.post(ELEMENT_URI + '/', element, config)
    // const response = await axios.post(ELEMENT_URI + '/' + elementId, element, config)
    // axios.post()
    console.log(response.data)
  },
  async updateElement ({ commit }, data) {
    console.log('updateElement in element.js is called')
    const token = data.token
    const element = data.element
    const objectId = data.objectId
    console.log('token in elements.js:', token)
    console.log('element data in elements.js:', element)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.put(ELEMENT_URI + '/' + objectId, element, config)
    console.log('axios.put called')
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
