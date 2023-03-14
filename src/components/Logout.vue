<template>
  <div>
    <div>
      Would you like to logout?
    </div>
    <div>
      <button type="button"
          class="btn btn-primary" @click="getCurrentUser()">Logout</button>
      <router-link :to="{ path: './Home' }"><button type="submit" class="btn btn-primary">Go home</button></router-link>
          </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  ...mapActions(['logoutUser']),
  methods:
  {
    async getCurrentUser () {
      console.log('getCurrentUser() is called')
      const token = this.$store.getters.getAuthToken
      console.log(token)
      const username = this.$store.getters.getUserName
      console.log(username)
      const password = this.$store.getters.password
      console.log(password)
      const response = await this.logoutUser({ token, username, password })
      console.log(response)
    }
  }
}
</script>