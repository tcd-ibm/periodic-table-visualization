<template>
  <div class="element-general-properties card">
    <div v-if="Object.keys(element).length > 0" class="card-block">
      <div class="d-flex justify-content-evenly">
        <div>
          <button type="button" class="btn btn-primary btn-block">Add element</button>
          <button type="button" class="btn btn-danger btn-block">Remove selected element</button>
        </div>
        <pre>     </pre>
        <div>
          <h4>{{ element.name }}</h4>
          <h6>{{ $t("element.group." + element.elementGroup) }}</h6>
        </div>
      </div>
      <p></p>
      <div class="d-flex justify-content-start">
        <form >
          <div class="form-group">
            <input type="text" v-model="search" class="form-control" id="searchInput" :placeholder="$t('general.search')">
          </div>
        </form>
        <pre>     </pre>
        <div class="d-flex justify-content-evenly">
          <featured-value :value="element.atomicNumber" title="element.atomicNumber" :element="element" :colored="true"></featured-value>
          <pre>    </pre>
          <featured-value :value="element.atomicMass" title="element.atomicMass" :element="element" :colored="true"></featured-value>
        </div>
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
  import { mapState } from 'vuex'
  import ElementBadge from '../ElementBadge'
  import BarChart from '../shared/BarChart'
  import FeaturedValue from './MyProfileFeaturedValue'
  import Highlight from '../shared/Highlight'
  import LineChart from '../shared/LineChart'

  export default {
    name: 'MyProfile-general-properties',
    props: ['element', 'preview'],
    components: {
      Highlight, FeaturedValue, BarChart, ElementBadge, LineChart
    },
    computed: {
      ...mapState({
        debug: state => state.configuration.debug
      })
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