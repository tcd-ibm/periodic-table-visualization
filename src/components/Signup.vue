<template>
<div>
  <div>
    <div>
      <h3>Signup
        <router-link :to="{ path: './login' }"><button type="submit" class="btn btn-primary">Login</button></router-link>
      </h3>
      <hr>
    </div>
  </div>
  <form>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Surname</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control">
    </div>
    <div class="form-group">
      <label>Repeat Password</label>
      <input type="password" class="form-control">
    </div>

    <div class="my-3">
      <router-link :to="{ path: './verify' }"><button type="submit" class="btn btn-primary">Sign
            Up</button></router-link>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'about'
}
</script>
