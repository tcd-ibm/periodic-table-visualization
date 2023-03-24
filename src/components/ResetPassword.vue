<template>
    <div>
        <h3>Please enter your new password</h3>
    <form>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password1" required>
         <label>Enter password again</label>
        <input type="password" class="form-control" v-model="password2" required>
      </div>
      <div class="my-3">
        <button type="button"
              class="btn btn-primary" @click="onReset()" >Reset Password</button>
      </div>
    </form>

</div>
    
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ResetPassword',
  data () {
    return {
      password1: '',
      password2: '',
      userId: ''
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
        const _id = this.userId
        await this.changePassword({_id, newPassword})
      } catch (error) {
        this.showErrorMessage(error.response.data.message)
      }
    },
    getUserId () {
      const currentUrl = 'Current Url: ' + window.location.href
      var strArr = currentUrl.split('/')
      this.userId = strArr[strArr.length - 1]
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
    this.getUserId()
    console.log('changePassword Page: ' + this.userId)
  }
}
</script>