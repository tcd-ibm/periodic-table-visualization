<template>
  <div><h3>Your email is verified! Please procced to login</h3>
    <router-link :to="{ path: './login' }"><button type="login" class="btn btn-primary">Login</button></router-link></div>
    
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'VerificationPage',
  methods: {
    ...mapActions(['verifyUser']),
    myFunction () {
      this.currentUrl = 'Current Url: ' + window.location.href
    },
    async callVerifyUser (data) {
      // console.log('data in callVerifyUSer: ', data)
      // console.log('type of data: ', typeof (data))
      await this.verifyUser(data)
    }
  },
  created () {
    this.myFunction()
    console.log('currentURL: ', this.currentUrl)
    var strArr = this.currentUrl.split('/')
    // console.log(strArr[5])
    const data = strArr[strArr.length - 1]
    this.callVerifyUser(data)
    // this.verifyUser(this.$route.query.confirmationCode)
  },
  data () {
    return {
      currentUrl: ''
    }
  }
}
</script>


