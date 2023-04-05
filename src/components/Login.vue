<template>
<div>
  <div>
    <div>
      <h3 class="centralise">Login
        <router-link :to="{ path: './signup' }"><button type="submit" class="btn btn-primary">Don't have an
              account?</button></router-link>
      </h3>
    </div>
  </div>
  <div>
    <form>
      <div class="centralise">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" required>
      </div>
      <div class="centralise">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" required>
      </div>
      <!-- need to verify email -->
      <div class="centralise">
        <button type="button"
              class="btn btn-primary" @click="submitForm()" >Login</button>
      </div>
      <div class="centralise">
        <router-link :to="{ path: './Reset' }"><button type="button" class="btn btn-primary">Forgot
              Password?</button></router-link>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import TestGetElement from './TestGetElement.vue'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginUser', 'getElements']),
    async submitForm () {
      if (!this.email) {
        alert('Please enter an email.')
        return
      }
      if (!this.password) {
        alert('Please enter your password')
        return
      }
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!this.email.match(validRegex)) {
        this.showErrorMessage('Invalid email format. Please try again!')
        return
      }
      try {
        const emailCopy = this.email
        const passwordCopy = this.password
        const response = await this.loginUser({emailCopy, passwordCopy})
        console.log('Returned object after login: ', response)
        console.log('UserName: ' + this.$store.getters.getUserName)
        console.log('Token: ' + this.$store.getters.getAuthToken)
        // this.showSuccessMessage('Welcome ' + this.$store.getters.getUserName + '!')
        localStorage.setItem('firstTimeLogIn', 1)
        this.$router.push('myProfile')
        // location.reload()
        location.reload()
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

<style scoped>
#error {
  color: red;
}

.centralise {
  text-align: center;
  padding-bottom:5px;
  padding-right: 400px;
  padding-left: 400px;
}

</style>