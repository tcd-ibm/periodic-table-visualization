<template>
  <div>
    <h1>Are you sure you want to log out from {{ username }}?</h1>
    <button @click="logout" type="submit" class="btn btn-primary">Yes</button>
    <router-link :to="{ path: './MyProfile' }"><button type="submit" class="btn btn-primary">Cancel</button></router-link>
  </div>
</template>

<script>
// import MyProfile from './MyProfile.vue' ??
export default {
  components: {
    // MyProfile
  },
  computed: {
    username () {
      return this.$store.getters.getUserName
    }
  },
  methods: {
    logout () {
      console.log(this.$store.getters.getUserName)
    }
  }
}
</script>