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
        <input type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control">
      </div>

      <div class="my-3">
        <router-link :to="{ path: './reset' }"><button type="submit" class="btn btn-primary">Forgot
              Password?</button></router-link>
      </div>

      <!-- need to verify email -->
      <div class="my-3">
        <router-link :to="{ path: './' }"><button type="submit"
              class="btn btn-primary">Login</button></router-link>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {}
</script>