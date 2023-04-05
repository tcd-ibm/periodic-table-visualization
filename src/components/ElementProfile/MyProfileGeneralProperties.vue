<template>
  <div class="element-general-properties card">
    <div v-if="Object.keys(element).length > 0" class="card-block">
      <div class="d-flex justify-content-evenly">
        <div>
        
          <button type="button" class="btn btn-danger btn-block" @click="deleteElemetLocal()">Remove selected element</button>
          <router-link :to="{ name: 'updateElement', params: { element: element} }" tag="button" type="button" class="btn btn-primary btn-block">Update element</router-link>
        </div>
        <pre>     </pre>
        <div>
          <h4>{{ element.name }}</h4>
          <h6>{{ $t("element.group." + element.group) }}</h6>
          <div class="d-flex justify-content-evenly">
            <featured-value :value="element.atomicNumber" title="element.atomicNumber" :element="element" :colored="true"></featured-value>
              <pre>    </pre>
            <featured-value :value="element.atomicMass" title="element.atomicMass" :element="element" :colored="true"></featured-value>
        </div>
        </div>
      </div>
      <div class="d-flex justify-content-evenly">
        <form >
          <div class="form-group">
            <pre></pre>
            <router-link :to="{ name: 'userElementDescription', params: { element: element} }" tag="button" type="button" class="btn btn-primary btn-block">View detailed information</router-link>
          </div>
        </form>
      </div>
      <div v-if="!preview">
        <highlight v-if="debug" :data="element"></highlight>

        <line-chart :element="element"></line-chart>
      </div>
        <!--<bar-chart></bar-chart>-->
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ElementBadge from '../ElementBadge'
  import BarChart from '../shared/BarChart'
  import FeaturedValue from './MyProfileFeaturedValue'
  import Highlight from '../shared/Highlight'
  import LineChart from '../shared/LineChart'

  export default {
    name: 'MyProfile-general-properties',
    props: ['element', 'preview', 'removed'],
    components: {
      Highlight, FeaturedValue, BarChart, ElementBadge, LineChart
    },
    computed: {
      ...mapState({
        debug: state => state.configuration.debug
      })
    },
    methods: {
      ...mapActions(['getElements', 'deleteElement']),
      async getElementsLocal () {
        const token = this.$store.getters.getAuthToken
        const res = await this.getElements(token)
        this.userElements = res
        // this.userElements is an array
        // console.log('userElement in myProfile.vue: ', thisuserElements)
        // console.log('res in myprofile: ', res)
      },
      async deleteElemetLocal () {
        try {
          console.log('element id: ', this.element)
          const token = this.$store.getters.getAuthToken
          const objectId = this.element._id
          // Daniel you have to get the objectId which is
          // the_id field if you inspect an element returned
          // by the this.getElements()
          // console.log('userElements before delete: ', thisuserElements)
          await this.deleteElement({token, objectId})
          await this.getElementsLocal()
          this.$router.go()
          this.showSuccessMessage('Deleted element from position: ' + this.element.position)
          // console.log('userElements after delete: ', thisuserElements)
        } catch (error) {
          this.showErrorMessage(error.response.data.message)
        }
      },
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
      }
    }
  }
</script>

<style scoped>
  .card-title {
    text-transform: capitalize;
  }

  .c-line-chart {
    margin: -1.25rem;
  }
</style>