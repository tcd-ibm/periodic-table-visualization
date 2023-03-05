import axios from 'axios'
const ELEMENT_URI = '/api/elements'
// const state = require('../../assets/data/mendelable.json')
const state = {
  userElements: null
}
const mutations = {
  setUserElements (state, elements) {
    state.userElements = elements
  }
}
const actions = {
  async getElements ({ commit }, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(ELEMENT_URI, config)
    await commit('setUserElements', response.data)
    console.log('response in element.js: ', response.data)
    return response.data
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
    console.log('Create element: ', response.data)
  },
  async updateElement ({ commit }, data) {
    const token = data.token
    const element = data.element
    const objectId = data.objectId
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.put(ELEMENT_URI + '/' + objectId.toString(), element, config)
  },
  async deleteElement ({ dispatch }, data) {
    const token = data.token
    const objectId = data.objectId
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(ELEMENT_URI + '/' + objectId, config)
    // await dispatch('getElements', token)
  }
}
const getters = {
  getUserElements: (state) => state.userElements
}

export default {
  state,
  mutations,
  actions,
  getters
}
