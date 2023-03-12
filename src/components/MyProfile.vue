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
      
      <myProfile-general-properties v-if="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :removed="removed" :preview="true"></myProfile-general-properties>
      <myProfile-general-properties v-else class="c-information" :element=this.userElements[0] :removed="removed" :preview="true"></myProfile-general-properties>
      <div :key="element.id" v-for="element in userElements"
          v-if="!removed.includes(element.symbol)"
          :data-element-group="getGroup(element)" :data-group='element.group'
          class='element' :class="'pos' + getPosition(element)"
          :style="{ opacity: filteredElements.includes(element.atomicNumber) ? 1 : 0.25 }">
          <router-link :to="'/element/'" @mousedown.native="showElement(userElements.indexOf(element))" @mouseout.native="hideElement()">
            <element-definition class="u-aspect-ratio" :element="element" :detailed="true"></element-definition>
          </router-link>
      </div>
      <div v-else class='element' :data-element-group="non-metal"><router-link :to="'/AddElement/'"><br><center><div class="material-icons">add_box</div></center><br></router-link></div>
      <div class="element" :data-element-group="non-metal" v-for="i in (118 - userElements.length)"><router-link :to="'/AddElement/'"><br><center><div class="material-icons">add_box</div></center><br></router-link></div>
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