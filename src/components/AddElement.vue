<template>
  <div>
  <h2>Add new element {{ this.$route.params.pos }}</h2>
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
  <label>Group</label>
  <div>
    <div>
      <input type="radio" id="group1" name="group" value="non-metal" />
      <label for="group1" ><FONT COLOR="#03a9f4">Nonmetals&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
      <input type="radio" id="group2" name="group" value="halogen" />
      <label for="group2"><FONT COLOR="#f06292">Halogens&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      <input type="radio" id="group3" name="group" value="metalloid" />
      <label for="group3"><FONT COLOR="#673ab7">Metalloids&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      <input type="radio" id="group4" name="group" value="metal" />
      <label for="group4"><FONT COLOR="#19caa7">Metals&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      <input type="radio" id="group5" name="group" value="alkaline-earth-metal" />
      <label for="group5"><FONT COLOR="#ff9800">Alkaline earth metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

    </div>
    <input type="radio" id="group6" name="group" value="transition-metal" />
    <label for="group6"><FONT COLOR="#efbb31">Transition metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

    <input type="radio" id="group7" name="group" value="noble-gas" />
    <label for="group7"><FONT COLOR="#00bcd4">Noble gases&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

    <input type="radio" id="group8" name="group" value="lanthanoid" />
    <label for="group8"><FONT COLOR="#8bc34a">Lanthanoids&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
    <input type="radio" id="group9" name="group" value="actinoid" />
    <label for="group9"><FONT COLOR="#cddc39">Actinoids&nbsp;&nbsp;&nbsp;</FONT></label>
    <input type="radio" id="group10" name="group" value="alkali-metal" />
    <label for="group10"><FONT COLOR="#f44336">Alkali metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
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
        position: '',
        an: '',
        am: '',
        description: '',
        group: []
      },
      showError: false
    }
  },
  methods: {
    ...mapActions(['createElements']),
    async addElement () {
      if (!this.element.name || !this.element.symbol || !this.element.an || !this.element.am || !this.element.description || !this.element.group) {
        alert('Please fill in all the fields.')
        return
      }
      console.log('Addelement in addelement.vue called')
      const element = {
        name: this.element.name,
        symbol: this.element.symbol,
        // set position (nextAvailablePosition)
        an: this.element.an,
        am: this.element.am,
        description: this.element.description,
        position: this.$route.params.pos,
        group: this.element.group
      }
      const token = this.$store.getters.getAuthToken
      await this.createElements({element, token})
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "src/assets/scss/components/_variables.scss";
</style>