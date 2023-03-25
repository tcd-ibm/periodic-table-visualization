<template>
  <div id="app" class="app container-fluid">
  <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { onBeforeUnmount } from 'vue'
export default {
  name: 'app',
  methods: {
    ...mapActions(['logoutUser']),
    async logoutUserLocal () {
      await this.logoutUser()
    }
  },
  setup () {
    onBeforeUnmount(() => {
      console.log('onMounted called in App.vue')
    })
  },
  mounted () {
    let beginTime = 0
    let differTime = 0
    window.onunload = function (e) {
      differTime = new Date().getTime() - beginTime
      console.log('differTime: ' + differTime)
      if (differTime < 8) {
        console.log('removeItems')
        localStorage.removeItem('userName')
        localStorage.removeItem('userToken')
      }
    }
    window.onbeforeunload = function (e) {
      beginTime = new Date().getTime()
    }
  },
  created () {
    const userName = localStorage.getItem('userName')
    const token = localStorage.getItem('userToken')
    console.log('on created() userName ' + userName + ' , token: ' + token)
  }
}
</script>

<style lang="scss">
@import './assets/scss/design.scss'
</style>
