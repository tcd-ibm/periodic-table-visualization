<template>
<div>
    <div>
        <div>
            <h3>Reset Password?
            <router-link :to="{ path: './login' }"><button type="submit" class="btn btn-primary">Login</button></router-link>
            </h3>
            <hr>
        </div>
    </div>
    <form>
        <div class="form-group">
            <label>Enter email</label>
            <input type="text" class="form-control">
        </div>

        <div>
            <hr />
        </div>
            <router-link :to="{ path: './Login' }"><button type="submit" class="btn btn-primary">Reset Password</button></router-link>
            <div>add verification here + reset password</div>
    </form>
</div>
</template>

<script>
export default {}
</script>

<style>

</style>
