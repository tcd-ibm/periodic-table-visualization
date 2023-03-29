<template>
  <div>
    <div>
      Would you like to logout?
    </div>
    <div>
      <button type="button" class="btn btn-primary" @click="logout()">Log out</button>
      <router-link :to="{ path: '/MyProfile' }"><button type="submit" class="btn btn-primary">Back to home</button></router-link>
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
      location.reload()
    }
  }
}
</script>
