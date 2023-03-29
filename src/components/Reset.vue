<template>
<div>
    <div>
        <div>
            <h3>Reset Password?
            <router-link :to="{ path: './Login' }"><button type="button" class="btn btn-primary">Login</button></router-link>
            </h3>
            <hr>
        </div>
    </div>
    <form>
        <div class="form-group">
            <label for="email">Enter email</label>
            <input type="text" id="email" class="form-control" v-model="email">
        </div>
        <button type="button" class="btn btn-primary" @click="onClick()">Confirm</button>
    </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['sendChangePasswordEmail', 'logoutUser']),
    async onClick () {
      try {
        if (!this.email) {
          alert('Please enter an email.')
          return
        }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!this.email.match(validRegex)) {
          this.showErrorMessage('Invalid email format. Please try again!')
          return
        }
        const email = this.email
        await this.sendChangePasswordEmail({email})
        this.showSuccessMessage('Email sent. Please check your mail box')
        if (this.$store.getters.getUserName) {
          await this.logoutUser()
        }
        this.$router.push('Login')
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
  }
}
</script>

<style>

</style>
