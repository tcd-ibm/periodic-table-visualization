<template>
  <div class="c-periodic-table">
    <element-general-properties v-show="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :preview="true"></element-general-properties>
    <div v-for="element in elements"
         :data-element-group='element.elementGroup' :data-group='element.group' :data-period='element.period'
         class='element' :class="element.symbol && element.symbol.toLowerCase()"
         :style="{ opacity: filteredElements.includes(element.atomicNumber) ? 1 : 0.25 }">
      <router-link :to="'/element/' + element.atomicNumber" @mouseover.native="showElement(element)" @mouseout.native="hideElement()">
        <element-definition class="u-aspect-ratio" :element="element" :detailed="true"></element-definition>
      </router-link>
    </div>

    <div class="element lanthanoid" data-element-group="lanthanoid" :style="{ opacity: filteredElementsContainElementsOfGroup('lanthanoid') ? 1 : 0.25 }"></div>
    <div class="element actinoid" data-element-group="actinoid" :style="{ opacity: filteredElementsContainElementsOfGroup('actinoid') ? 1 : 0.25 }"></div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import ElementBadge from './ElementBadge'
  import ElementDefinition from './ElementDefinition'
  import ElementGeneralProperties from './ElementProfile/ElementGeneralProperties'

  export default {
    name: 'periodic-table',
    components: {
      ElementGeneralProperties, ElementDefinition, ElementBadge
    },
    computed: {
      // ...mapGetters({
      //   elements: 'localizedElements',
      //   filteredElements: 'filteredElements'
      // }),
      selectedElement () {
        // console.log('type of this.selectId: ' + typeof (this.selectedElementId))
        // console.log('PeriodicTbale.vue: elements: ' + JSON.stringify(this.elements))
        return this.elements[this.selectedElementId] || {}
      }
    },
    data () {
      return {
        selectedElementId: 1,
        showInfo: false,
        elements: '',
        filteredElements: ''
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
    },
    created () {
      this.elements = this.$store.getters.localizedElements
      this.filteredElements = this.$store.getters.filteredElements
      console.log('elements in periodic table: ' + JSON.stringify(this.elements))
      console.log('filteredElements in periodic table: ' + JSON.stringify(this.filteredElements))
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/periodic-table";
</style>
