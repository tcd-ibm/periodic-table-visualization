<template>
    <div>
        <h2>Add new element</h2>
        <form>
            <div class="form-group">
            <label>Name</label>
            <input type="text" :maxlength="20" class="form-control">
            </div>
            <div class="form-group">
            <label>Symbol</label>
            <input type="text" :maxlength="2" class="form-control">
            </div>
            <div class="form-group">
            <label>Atomic Number</label>
            <input type="number" class="form-control">
            </div>
            <div class="form-group">
            <label>Atomic Mass</label>
            <input type="number" class="form-control">
            </div>
            <div class="form-group">
            <label>Description</label>
            <input type="text" :maxlength="250" class="form-control">
            </div>
            <div class="my-3">
                <router-link :to="{ path: './MyProfile' }"><button type="button" class="btn btn-primary btn-block">Add element</button></router-link>
            </div>
            <div class="my-3">
            <router-link :to="{ path: './MyProfile' }"><button type="button" class="btn btn-danger btn-block">Cancel</button></router-link>
            </div>

        </form>
    </div>
</template>

<script>
export default {}
</script>