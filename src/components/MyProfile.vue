<template>
    <div>
      <h3 v-if="username">{{username}}'s profile<br></h3>
    <div class="c-periodic-table">
      <block1 :class="'block1'"></block1>
      <block2 :class="'block2'"></block2>
      <block3 :class="'block3'"></block3>
      <block4 :class="'block4'"></block4>
      <block5 :class="'block5'"></block5>
      <block6 :class="'block6'"></block6>

      <block7 :class="'block7'"></block7>
      <block8 :class="'block8'"></block8>

      <block9 :class="'block9'"></block9>
      <block10 :class="'block10'"></block10>
      
      <myProfile-general-properties v-if="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :removed="removed" :preview="true" ></myProfile-general-properties>
      <myProfile-general-properties v-else class="c-information" :element="'sample'" :removed="removed" :preview="true"></myProfile-general-properties>
      <div class="element" :data-element-group="non-metal" v-for="i in 118" v-if="empty(userElements, i - 1)" :key="i"><router-link :to="{ name: 'AddElement', params: { pos: i - 1} }"><br><center><div class="material-icons">add_box</div></center><br></router-link></div>
      <div :key="element.id" v-else v-for="element in userElements"
          v-if="!removed.includes(element.symbol)"
          :data-element-group="getGroup(element)" :data-group='element.group'
          class='element' :class="'pos' + getPosition(element)"
          :style="{ opacity: filteredElementsContainElementsOfGroup(element.group) ? 1 : 0.25 }">
          <router-link :to="'/element/'" @mousedown.native="showElement(userElements.indexOf(element))" @mouseout.native="hideElement()">
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
        return this.userElements[this.selectedElementId] || {}
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
      showElement (index) {
        this.showInfo = true
        this.selectedElementId = index
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
      getPosition (element) {
        return element.position
      },
      getGroup (element) {
        return element.group
      },
      empty (userElements, i) {
        let pos = i
        for (let i = 0; i < userElements.length; i++) {
          if (userElements[i].position === pos) {
            return 0
          }
        }
        return 1
      },
      syncUserName () {
        this.username = this.$store.getters.getUserName
      },
      async getElementsLocal () {
        const token = this.$store.getters.getAuthToken
        const res = await this.getElements(token)
        this.userElements = res
      }
    },
    created () {
      this.syncUserName()
      this.getElementsLocal()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/myProfile-table";
</style>