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
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" >
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
      <button @click="submitForm()" type="submit" class="btn btn-primary">Sign
          Up</button>
    </div>
  </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      reEnterPassword: '',
      showError: false
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    async submitForm () {
      if (this.password !== this.reEnterPassword) {
        console.log('password dont match')
        alert('password do not match')
        return
      }
      try {
        const firstname = this.firstname
        const lastname = this.lastname
        const email = this.email
        const password = this.password
        const response = await this.registerUser({firstname, lastname, email, password})
        console.log('Signup.vue/submitForm() response object => ', response)
        this.showError = false
      } catch (error) {
        console.log(error.message)
        this.showError = true
      }
    }
  }
}
</script>
