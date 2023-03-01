<template>
  <div>
  <h2>Update your element</h2>
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
    <input type="text" :maxlength="250" class="form-control" v-model="element.description">
    </div>
    <div class="my-3">
    <button @click="updateElement()" class="btn btn-primary">Update element</button>
    </div>
    <div class="my-3">
    <router-link :to="{ path: './MyProfile' }"><button type="button"
      class="btn btn-danger btn-block">Cancel</button></router-link>
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
  ...mapActions(['updateElement']),
  async updateElement () {
    console.log('updateElement in updateElement.vue called')
    const element = {
    name: this.element.name,
    symbol: this.element.symbol,
    an: this.element.an,
    am: this.element.am,
    description: this.element.description
    }
    const token = this.$store.getters.getAuthToken
    await this.updateElement({ element, token })
     const id = // get the ID of the element you want to update
        await axios.put(`/api/elements/${id}`, { element }, {
          headers: { Authorization: `Bearer ${token}` }
        })
  }
  }
}

</script>
