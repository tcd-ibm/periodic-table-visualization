<template>
    <div class="home row">
      <h3>{{name}}'s profile</h3>
    <div class="c-periodic-table">
      <myProfile-general-properties v-if="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :removed="removed" :preview="true"></myProfile-general-properties>
      <myProfile-general-properties v-else class="c-information" :element=this.elements[1] :preview="true"></myProfile-general-properties>
      <div v-for="element in elements"
          v-if="!removed.includes(element.symbol)"
          :data-element-group='element.elementGroup' :data-group='element.group' :data-period='element.period'
          class='element' :class="element.symbol && element.symbol.toLowerCase()"
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
  import { mapGetters } from 'vuex'
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
        removed: ['blank'],
        name: this.$store.getters.getUserName
      }
    },
    methods: {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/periodic-table";
</style>