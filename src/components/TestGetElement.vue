<template>
    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            elements: null
        }
    },
    methods: {
        ...mapActions(['getElements'])
    }
}
</script>
