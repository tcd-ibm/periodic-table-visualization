<template>
  <div>
  <h2>Add new element</h2>
  <form>
  <div class="form-group">
  <label>Name</label>
  <input type="text" :maxlength="20" class="form-control" v-model="element.name">
  </div>
  <div class="form-group">
  <label>Symbol</label>
  <input type="text" :maxlength="2" class="form-control" v-model="element.symbol">
  </div>
  <div class="form-group">
  <label>Atomic Number</label>
  <input type="number" class="form-control" v-model="element.an">
  </div>
  <div class="form-group">
  <label>Atomic Mass</label>
  <input type="number" class="form-control" v-model="element.am">
  </div>
  <div class="form-group">
  <label>Description</label>
  <!-- <input type="text" :maxlength="250" class="form-control" v-model="element.description"> -->
  <textarea class="form-control" cols="30" rows="10" v-model="element.description"></textarea>
  </div>
  <div class="my-3">
  <button  @click="addElement(); this.$delete(this.removed,0)" class="btn btn-primary">Create element</button>
  </div>
  <div class="my-3">
  <router-link :to="{ path: './MyProfile' }"><button type="button" class="btn btn-danger btn-block">Cancel</button></router-link>
  </div>

  </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      element: {
        name: '',
        symbol: '',
        an: '',
        am: '',
        description: ''
      },
      showError: false
    }
  },
  methods: {
    ...mapActions(['createElements']),
    async addElement () {
      if (!this.element.name || !this.element.symbol || !this.element.an || !this.element.am || !this.element.description) {
        alert('Please fill in all the fields.')
        return
      }
      console.log('Addelement in addelement.vue called')
      const element = {
        name: this.element.name,
        symbol: this.element.symbol,
        an: this.element.an,
        am: this.element.am,
        description: this.element.description,
        position: 105,
        group: ['Default']
      }
      const token = this.$store.getters.getAuthToken
      await this.createElements({element, token})
    }
  }
}

</script>
