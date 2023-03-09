<template>
  <div>
  <h1>Are you sure you want to log out from {{ username }}?</h1>
  <router-link to="./Login"><button @onClick="handleLogout" type="submit" class="btn btn-primary">Yes</button></router-link>
  <router-link to="./MyProfile"><button type="button" class="btn btn-primary">Cancel</button></router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUserName']),
    username () {
      console.log(this.getUserName)
      return this.getUserName
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    handleLogout () {
    // Call an action in the store to log the user out
      this.$store.dispatch('logout').then(() => {
      // Navigate to the login page after the user is logged out
        this.$router.push({ path: '/login' })
      })
    }
  },
  mounted () {
  // Add a listener for the window.onbeforeunload event
    window.addEventListener('beforeunload', this.handleLogout)
  },
  beforeDestroy () {
  // Remove the listener when the component is about to be destroyed
    window.removeEventListener('beforeunload', this.handleLogout)
  }
}
</script>