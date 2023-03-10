<template>
    <div class="home row">
      <h3 v-if="username">{{username}}'s profile</h3>
    <div class="c-periodic-table">
      <myProfile-general-properties v-if="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :removed="removed" :preview="true"></myProfile-general-properties>
      <myProfile-general-properties v-else class="c-information" :element=this.elements[1] :removed="removed" :preview="true"></myProfile-general-properties>
      <div :key="element.id" v-for="element in userElements"
          v-if="!removed.includes(element.symbol)"
          :data-element-group='element.elementGroup' :data-group='element.group' :data-period='element.period'
          class='element' :class="element.position && element.position.toLowerCase()"
          :style="{ opacity: filteredElements.includes(element.atomicNumber) ? 1 : 0.25 }">
        <router-link :to="'/element/'" @mousedown.native="showElement(element)" @mouseout.native="hideElement()">
          <element-definition class="u-aspect-ratio" :element="element" :detailed="true"></element-definition>
        </router-link>
      </div>
      <div class="element lanthanoid" data-element-group="lanthanoid" :style="{ opacity: filteredElementsContainElementsOfGroup('lanthanoid') ? 1 : 0.25 }"></div>
      <div class="element actinoid" data-element-group="actinoid" :style="{ opacity: filteredElementsContainElementsOfGroup('actinoid') ? 1 : 0.25 }"></div>
    </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ElementBadge from './ElementBadge'
  import ElementDefinition from './ElementDefinition'
  import MyProfileGeneralProperties from './ElementProfile/MyProfileGeneralProperties'

  export default {
    name: 'periodic-table',
    components: {
      MyProfileGeneralProperties, ElementDefinition, ElementBadge
    },
    computed: {
      ...mapGetters({
        elements: 'localizedElements',
        filteredElements: 'filteredElements'
      }),
      selectedElement () {
        return this.elements[this.selectedElementId] || {}
      }
    },
    data () {
      return {
        selectedElementId: '',
        showInfo: false,
        removed: [],
        username: this.$store.getters.getUserName,
        userElements: []
      }
    },
    methods: {
      ...mapActions(['getElements', 'deleteElement']),
      showElement (element) {
        this.showInfo = true
        this.selectedElementId = element.atomicNumber
      },
      hideElement () {
        this.showInfo = false
      },
      filteredElementsContainElementsOfGroup (group) {
        let filteredElementsContainElementsOfGroup = false
        for (let id of this.filteredElements) {
          if (this.elements[id].elementGroup === group) {
            filteredElementsContainElementsOfGroup = true
          }
        }
        return filteredElementsContainElementsOfGroup
      },
      syncUserName () {
        this.username = this.$store.getters.getUserName
      },
      async getElementsLocal () {
        const token = this.$store.getters.getAuthToken
        const res = await this.getElements(token)
        this.userElements = res
        // this.userElements is an array
        // console.log('userElement in myProfile.vue: ', this.userElements)
        // console.log('res in myprofile: ', res)
      },
      async deleteElemetLocal () {
        const token = this.$store.getters.getAuthToken
        const objectId = '6404c7223de32f15948ead1c'
        // Daniel you have to get the objectId which is
        // the_id field if you inspect an element returned
        // by the this.getElements()
        // console.log('userElements before delete: ', this.userElements)
        await this.deleteElement({token, objectId})
        await this.getElementsLocal()
        // console.log('userElements after delete: ', this.userElements)
      }
    },
    created () {
      this.syncUserName()
      this.getElementsLocal()
      this.deleteElemetLocal()
      // console.log('userElements in myProfile: ', this.userElements)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/myProfile-table";
</style>