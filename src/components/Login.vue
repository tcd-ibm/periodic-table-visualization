<template>
<div>
  <div>
    <div>
      <h3>Login
        <router-link :to="{ path: './signup' }"><button type="submit" class="btn btn-primary">Don't have an
              account?</button></router-link>
      </h3>
    </div>
  </div>
  <div>
    <form>
      <div class="form-group">
        <label>Email/Username</label>
        <input type="email" class="form-control" v-model="form.email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="form.password">
      </div>

      <!-- need to verify email -->
      <div class="my-3">
        <button type="submit"
              class="btn btn-primary" @click="submitForm()" >Login</button>
      </div>
      <div class="my-3">
        <router-link :to="{ path: './reset' }"><button type="submit" class="btn btn-primary">Forgot
              Password?</button></router-link>
      </div>

      <div class="my-3">
        <button  @click="testGetElement()" type="submit" class="btn btn-primary">Test get element</button>
      </div>

      
    </form>
    <p v-if="showError" id="error">Username or Password is incorrect</p>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      showError: false
    }
  },
  methods: {
    ...mapActions(['loginUser', 'getElements']),
    async submitForm () {
      // console.log('login.vue submitForm() is called')
      // console.log('email: ', this.form.email)
      // console.log('password: ', this.form.password)
      try {
        console.log('calling this.loginUser()')
        await this.loginUser(this.form)
        // console.log(response)
        this.showError = false
      } catch (error) {
        console.log(error)
        this.showError = true
      }
    },
    async testGetElement () {
      console.log('testGetElement() is called')
      const token = this.$store.getters.getAuthToken
      console.log('token from login.vue: ', token)
      await this.getElements(token)
    }
  }
}
</script>

<style scoped>
#error {
  color: red;
}

</style>