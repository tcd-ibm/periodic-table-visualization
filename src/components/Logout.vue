<template>
  <div>
    <div>
      Would you like to logout?
    </div>
    <div>
      <button type="button" class="btn btn-primary" @click="logout()">Logout</button>
      <router-link :to="{ path: './Home' }"><button type="submit" class="btn btn-primary">Go home</button></router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['logoutUser']),
    async logout () {
      console.log('logout() is called in logout.vue')
      const token = this.$store.getters.getAuthToken
      console.log(token)
      const username = this.$store.getters.getUserName
      console.log(username)
      await this.logoutUser()
      this.$router.push('Login')
    }
  },
  mounted () {
    window.addEventListener('beforeunload', this.logout)
    console.log('HELLO')
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.logout)
  }
}
</script>
