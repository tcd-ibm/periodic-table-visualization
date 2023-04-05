<template>
    <div>
       <p>hellow</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TestGetElements',
  data () {
    return {
      userElements: null
    }
  },
  methods: {
    ...mapActions(['getElements']),
    async getElementsLocal () {
      const token = this.$store.getters.getAuthToken
      await this.getElements(token)
    }
  },
  created () {
    this.getElementsLocal()
    this.userElements = this.$store.getter.getUserElements
  }
}
</script>
