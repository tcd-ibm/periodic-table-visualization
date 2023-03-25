<template>
  <div id="app" class="app container-fluid">
  <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'app',
  methods: {
    ...mapActions(['sendChangePasswordEmail', 'logoutUser']),
    myUnload (event) {
      if (window.SessionStorage) {
      // flag the page as being unloading
        window.SessionStorage['myUnloadEventFlag'] = new Date().getTime()
      }
      // notify the server that we want to disconnect the user in a few seconds (I used 5 seconds)
      // synchronous AJAX call
      axios.post('/api/logoutUser', { timeout: 5000 })
        .then(response => {
          // handle success response
          this.logoutUser()
        })
        .catch(error => {
          // handle error response
          console.log(error)
        })
    },
    myLoad (event) {
      if (window.SessionStorage) {
        var t0 = Number(window.SessionStorage['myUnloadEventFlag'])
        if (isNaN(t0)) {
          t0 = 0
        }
        var t1 = new Date().getTime()
        var duration = t1 - t0
        if (duration < 10 * 1000) {
          // less than 10 seconds since the previous Unload event => it's a browser reload (so cancel the disconnection request)
          // asynchronous AJAX call
          axios.post('/api/cancelDisconnectionRequest')
            .then(response => {
            // handle success response
            })
            .catch(error => {
            // handle error response
              console.log(error)
            })
        } else {
          this.logoutUser() // last unload event was for a tab/window close => do whatever you want (I do nothing here)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/design.scss'
</style>
