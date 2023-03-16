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

        <div>
            <hr />
        </div>
            <router-link :to="{ path: './Login' }"><button type="button" class="btn btn-primary">Confirm</button></router-link>
    </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Reset',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions('sendChangePasswordEmail'),
    async onClick () {
      try {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!this.email.match(validRegex)) {
          this.showErrorMessage('Invalid email format. Please try again!')
          return
        }
        await this.sendChangePasswordEmail(this.email)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
