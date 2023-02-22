import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import counters from './modules/counters'
import elements from './modules/elements'
import language from './modules/language'
import filters from './modules/filters'
import game from './modules/game'
import configuration from './modules/configuration'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
/**
 * data from mendelable.json is imported as elements
 * from /mocules/elements
 * and used in Vuex state manager
 */
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    counters,
    elements,
    language,
    filters,
    game,
    configuration,
    auth
  },
  plugins: [createPersistedState()],
  strict: debug
})
