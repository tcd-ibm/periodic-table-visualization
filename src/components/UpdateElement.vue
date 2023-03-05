<template>
  <div>
  <h2>Update your element</h2>
  <form>
    <div class="form-group">
    <label>ObjectId</label>
    <input type="text" :maxlength="50" class="form-control" v-model="objectId">
    </div>
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
    <button @click="updateElemntLocal()" class="btn btn-primary">Update element</button>
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
      objectId: '',
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
    async updateElemntLocal () {
      console.log('updateElement in updateElemntLocal.vue called')
      const element = {
        name: this.element.name,
        symbol: this.element.symbol,
        an: this.element.an,
        am: this.element.am,
        description: this.element.description
      }
      const token = this.$store.getters.getAuthToken
      const objectId = this.objectId
      await this.updateElement({ element, token, objectId })
      // await this.getElement(token)
      // const id = // get the ID of the element you want to update
      //    await axios.put(`/api/elements/${id}`, { element }, {
      //      headers: { Authorization: `Bearer ${token}` }
      //    })
    }
  }
}

</script>
