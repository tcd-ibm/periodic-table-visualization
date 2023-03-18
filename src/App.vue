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
    ...mapActions(['sendChangePasswordEmail'])
  },
  created () {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      const email = 'nzhang@tcd.ie'
      this.sendChangePasswordEmail({email})
    })
  }
}
</script>

<style lang="scss">
  @import './assets/scss/design.scss';
</style>
