<template>
  <div id="app" class="app container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
// note to Andrew: I think this is where you should detect browswer close event and call logout
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import './assets/scss/design.scss';
</style>
