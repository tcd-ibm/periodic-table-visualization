<template>
    <div>
        <div class="row">
            <div>
                <h1>Element:&nbsp; <span :class="'u-color-' + this.$route.params.element.group">{{ this.$route.params.element.name }}</span> </h1>
                <h2>Symbol:&nbsp; <span :class="'u-color-' + this.$route.params.element.group">{{ this.$route.params.element.symbol }}</span></h2>
            </div>
        </div>
        <br>
        <div>
            <div class="row">
                <h4>Atomic mass:&nbsp; <span :class="'u-color-' + this.$route.params.element.group">{{ this.$route.params.element.atomic_mass }}</span></h4>
                <pre>     </pre>
                <h4>Atomic number:&nbsp; <span :class="'u-color-' + this.$route.params.element.group">{{ this.$route.params.element.atomic_number }}</span></h4>
            </div>
            <div class="row">
                <h4>Group:&nbsp; <span :class="'u-color-' + this.$route.params.element.group">{{ this.$route.params.element.group }}</span></h4>
            </div>
        </div>
        <br>
        <div class="row" :class="'u-color-' + this.$route.params.element.group">
            <h3>Description</h3>
        </div>
        <div>
        </div>
        <div>
            <div class="row">
                <h5 class="text-muted">created at:&nbsp; {{ this.$route.params.element.createdAt.substring(0,10) }}</h5>
            </div>
            <div class="row">
                <h5> {{ this.$route.params.element.description }}</h5>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import "../assets/scss/trumps/_colors.scss";
</style>