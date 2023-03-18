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
    ...mapActions(['logoutUser'])
  },
  created () {
    this.logoutUser()
  }
}
</script>

<style lang="scss">
@import './assets/scss/design.scss';
</style>