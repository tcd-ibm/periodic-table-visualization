// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

window.$ = window.jQuery = require('jquery')
window.tether = window.Tether = require('tether')
require('bootstrap')
require('font-awesome/css/font-awesome.css')
require('highlight.js/styles/monokai-sublime.css')
// axios seeting
// Tells Axios to send all request with credentials such as authorization headers
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'https://localhost:8080'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true
})
