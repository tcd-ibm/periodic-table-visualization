<template>
<div>
  <div>
    <div>
      <h3>Register
        <router-link :to="{ path: './login' }"><button type="submit" class="btn btn-primary">Login</button></router-link>
      </h3>
      <hr>
    </div>
  </div>
  <form >
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" v-model="firstname">
    </div>
    <div class="form-group">
      <label>Surname</label>
      <input type="text" class="form-control" v-model="lastname">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email">
    </div>
    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="userName">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <div class="form-group">
      <label>Repeat Password</label>
      <input type="password" class="form-control" v-model="reEnterPassword">
    </div>

    <div class="my-3">
      <button @click="submitForm()" type="button" class="btn btn-primary">Sign
          Up</button>
    </div>
  </form>
</div>
</template>

<script lang="js">
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data () {
    return {
      firstname: '',
      lastname: '',
      userName: '',
      email: '',
      password: '',
      reEnterPassword: ''
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    async submitForm () {
      if (this.password !== this.reEnterPassword) {
        alert('Password do not match')
        return
      }
      if (this.firstname === '' || this.lastname === '' || this.email === '' || this.userName === '' || this.password === '' || this.reEnterPassword === '') {
        alert('Please enter all fields and try again.')
        return
      }
      try {
        const firstname = this.firstname
        const lastname = this.lastname
        const userName = this.userName
        const email = this.email
        const password = this.password
        await this.registerUser({firstname, lastname, userName, email, password})
        this.showSuccessMessage('Success! Please check our email to verify your account!')
        // console.log('Signup.vue/submitForm() response object => ', response)
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
