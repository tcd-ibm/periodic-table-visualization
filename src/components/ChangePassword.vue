<template>

    <form>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" required>
      </div>
    </form>
    <!-- <p>Hello World!</p> -->
    <!-- <div> -->
        <!-- <div>
        </div> -->
    <!-- <h2>Please enter your new password</h2> -->
        <!-- <label for="p1">Password:</label>
        <input v-model="password1" type="password" id="p1">
        <label for="p2">Password:</label>
        <input v-model="password2" type="password" id="p2"> -->
    <!-- </div> -->
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChangePasswordPage',
  data () {
    return {
      password1: '',
      password2: '',
      userID: ''
    }
  },
  methods: {
    ...mapActions(['changePassword']),
    async onReset () {
      if (!this.password1 || !this.password2) {
        this.showErrorMessage('Please enter all the fields')
        return
      }
      if (this.password1 !== this.password2) {
        this.showErrorMessage('Password does not match.')
        return
      }
      try {
        const newPassword = this.password1
        const _id = this.userID
        await this.changePassword({_id, newPassword})
      } catch (error) {
        this.showErrorMessage(error.response.data.message)
      }
    },
    getUserId () {
      const currentUrl = 'Current Url: ' + window.location.href
      var strArr = currentUrl.split('/')
      this.userID = strArr[strArr.length - 1]
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
    }
  },
  created () {
    console.log('changePassword Page')
    // this.getUserId()
  }
}
</script>
