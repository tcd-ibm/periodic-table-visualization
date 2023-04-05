<template>
  <div>
  <h2>Update your element "{{ this.$route.params.element.name }}" </h2>
  <form>
    <div class="form-group">
    <label>Name</label>
    <input type="text" :maxlength="20" class="form-control" v-model="element.name" >
    <input type="text" :maxlength="20" class="form-control" v-model="element.name" >
    </div>
    <div class="form-group">
    <label>Symbol</label>
    <input type="text" :maxlength="2" class="form-control" v-model="element.symbol" >
    </div>
    <div class="form-group">
    <label>Atomic Number</label>
    <input type="number" class="form-control" v-model="element.an" >
    </div>
    <div class="form-group">
    <label>Atomic Mass</label>
    <input type="number" class="form-control" v-model="element.am">
    </div>
    <div class="form-group">
    <label>Description</label>
    <input type="text area" :maxlength="250" class="form-control" v-model="element.description">
    </div>
    <label>Group</label>
    <div>
      <div>
        <input v-model="element.group" type="radio" id="group1" name="group" value="non-metal" checked/>

        <label for="group1" ><FONT COLOR="#03a9f4">Nonmetals&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
        <input v-model="element.group" type="radio" id="group2" name="group" value="halogen" />
        <label for="group2"><FONT COLOR="#f06292">Halogens&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

        <input v-model="element.group" type="radio" id="group3" name="group" value="metalloid" />
        <label for="group3"><FONT COLOR="#673ab7">Metalloids&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

        <input v-model="element.group" type="radio" id="group4" name="group" value="metal" />
        <label for="group4"><FONT COLOR="#19caa7">Metals&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

        <input v-model="element.group" type="radio" id="group5" name="group" value="alkaline-earth-metal" />
        <label for="group5"><FONT COLOR="#ff9800">Alkaline earth metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      </div>
      <input v-model="element.group" type="radio" id="group6" name="group" value="transition-metal" />
      <label for="group6"><FONT COLOR="#efbb31">Transition metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      <input v-model="element.group" type="radio" id="group7" name="group" value="noble-gas" />
      <label for="group7"><FONT COLOR="#00bcd4">Noble gases&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>

      <input v-model="element.group" type="radio" id="group8" name="group" value="lanthanoid" />
      <label for="group8"><FONT COLOR="#8bc34a">Lanthanoids&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
      <input v-model="element.group" type="radio" id="group9" name="group" value="actinoid" />
      <label for="group9"><FONT COLOR="#cddc39">Actinoids&nbsp;&nbsp;&nbsp;</FONT></label>
      <input v-model="element.group" type="radio" id="group10" name="group" value="alkali-metal" />
      <label for="group10"><FONT COLOR="#f44336">Alkali metals&nbsp;&nbsp;&nbsp;&nbsp;</FONT></label>
    </div>
      <div class="my-3">
      <button @click="updateElemntLocal()" class="btn btn-primary" type="button">Update element</button>
      </div>
      <div class="my-3">
      <router-link :to="{ path: '/MyProfile' }"><button type="button"
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
      position: '',
      objectId: '',
      element: {
        name: '',
        symbol: '',
        an: '',
        am: '',
        description: '',
        group: ''
      },
      showError: false
    }
  },
  methods: {
    ...mapActions(['updateElement']),
    showErrorMessage (errorMessage) {
      this.$toast.error(errorMessage, {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },
    showSuccessMessage (message) {
      this.$toast.success(message, {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },
    async updateElemntLocal () {
      const element = {
        position: this.position,
        name: this.element.name,
        symbol: this.element.symbol,
        an: this.element.an,
        am: this.element.am,
        description: this.element.description,
        group: this.element.group
      }
      const token = this.$store.getters.getAuthToken
      const objectId = this.objectId
      try {
        await this.updateElement({ element, token, objectId })
        this.showSuccessMessage('Element Updated!')
        this.$router.push('myProfile')
      } catch (error) {
        this.showErrorMessage(error.response.data.message)
      }
    }
  },
  created () {
    this.element.name = this.$route.params.element.name
    this.element.am = this.$route.params.element.atomic_mass
    this.element.an = this.$route.params.element.atomic_number
    this.element.symbol = this.$route.params.element.symbol
    this.element.description = this.$route.params.element.description
    this.position = this.$route.params.element.position
    this.objectId = this.$route.params.element._id
    this.element.group = this.$route.params.element.group
  }
}

</script>
