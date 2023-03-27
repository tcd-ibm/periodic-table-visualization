<template>
    <div>
      <h3 v-if="username">{{username}}'s profile
      <router-link :to="{ path: './logout' }"><button type="submit" class="btn btn-primary">Logout?</button></router-link></h3>
    <div class="c-periodic-table">
      <div :class="'block1'"></div>
      <div :class="'block2'"></div>
      <div :class="'block3'"></div>
      <div :class="'block4'"></div>
      <div :class="'block5'"></div>
      <div :class="'block6'"></div>

      <div :class="'block7'"></div>
      <div :class="'block8'"></div>

      <div :class="'block9'"></div>
      <div :class="'block10'"></div>
      
      <myProfile-general-properties v-if="Object.keys(selectedElement).length > 0" class="c-information" :element="selectedElement" :removed="removed" :preview="true" ></myProfile-general-properties>
      <div class="c-information"></div>
<<<<<<< HEAD
      <div class="element" :data-element-group="non-metal" v-for="i in 118" v-if="empty(userElements, i - 1)" :key="i"><router-link :to="{ name: 'AddElement', params: { pos: i - 1} }"><br><center><div class="material-icons">add_box</div></center><br></router-link></div>
      <div :key="element.id" v-else-if="!empty(userElements, i - 1)" v-for="element in userElements"
          
=======
      <div class="element" :data-element-group="groups[10]" v-for="i in 118" v-if="empty(userElements, i - 1)" :key="i"><router-link :to="{ name: 'AddElement', params: { pos: i - 1} }"><br><center><div class="material-icons">add_box</div></center><br></router-link></div>
      <div :key="element.id" v-for="element in userElements"
          v-if="!removed.includes(element.symbol)"
>>>>>>> 818128c1e81cf83afd34995ac9837e5a5dc84b27
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
        userElements: [],
        groups: [
          'non-metal',
          'halogen',
          'metalloid',
          'metal',
          'alkali-metal',
          'alkaline-earth-metal',
          'transition-metal',
          'noble-gas',
          'lanthanoid',
          'actinoid',
          'add'
        ]
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
      }
    },
    created () {
      this.syncUserName()
      this.getElementsLocal()
      if (localStorage.getItem('firstTimeLogIn') === 1) {
        localStorage.setItem('firstTimeLogIn', 2)
        this.showSuccessMessage('Welcome ' + localStorage.getItem('userName'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/myProfile-table";
</style>