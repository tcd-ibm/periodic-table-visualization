<template>
  <div id="app" class="app container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions(['sendChangePasswordEmail', 'logoutUser'])
  },
  mounted () {
    // Check if the token is present in local storage
    const token = this.$store.getters.getAuthToken
    if (token === '') {
      // If the token is not present, log the user out
      this.logoutUser()
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/design.scss'
</style>
