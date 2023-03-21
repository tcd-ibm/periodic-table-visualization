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
  created () {
    // need to find a way to distinguish page refresh and browser/tab close
    window.addEventListener('beforeunload', this.logoutUser())
  }
}
</script>

<style lang="scss">
@import './assets/scss/design.scss';
</style>
