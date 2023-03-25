<template>
  <div><h3>Your email is verified! Please procced to login</h3>
    <router-link :to="{ path: '/login' }"><button type="login" class="btn btn-primary" >Login</button></router-link></div>
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
      try {
        await this.verifyUser(data)
        this.showSuccessMessage('Success: Account Verified!')
      } catch (error) {
        this.showErrorMessage(error.response.data.message)
      }
    },
    showErrorMessage (errorMessage) {
      this.$toast.error(errorMessage, {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },
    showSuccessMessage (message) {
      this.$toast.success(message, {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    }
  },
  created () {
    this.myFunction()
    var strArr = this.currentUrl.split('/')
    const data = strArr[strArr.length - 1]
    this.callVerifyUser(data)
  },
  data () {
    return {
      currentUrl: ''
    }
  }
}
</script>


