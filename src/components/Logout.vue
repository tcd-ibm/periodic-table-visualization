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
      await this.logoutUser()
      localStorage.setItem('firstTimeLogIn', 0)
      this.$router.push('Login')
      location.reload()
    }
  }
}
</script>
