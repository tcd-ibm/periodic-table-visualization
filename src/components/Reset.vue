<template>
<div>
    <div>
        <div>
            <h3>Reset Password?
            <router-link :to="{ path: './login' }"><button type="button" class="btn btn-primary">Login</button></router-link>
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
    ...mapActions(['sendChangePasswordEmail']),
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
        console.log('onClick() in Reset.vue called' + this.email)
        const email = this.email
        const data = {email}
        await this.sendChangePasswordEmail(data)
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
    }
  }
}
</script>

<style>

</style>
