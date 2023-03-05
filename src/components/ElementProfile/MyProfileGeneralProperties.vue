<template>
  <div class="element-general-properties card">
    <div v-if="Object.keys(element).length > 0" class="card-block">
      <div class="d-flex justify-content-evenly">
        <div>
          <router-link :to="'/AddElement/'" tag="button" type="button" class="btn btn-primary btn-block" :disabled="!removed.length">Add element</router-link>
          <button type="button" class="btn btn-danger btn-block" @click="removed.push(element.symbol)">Remove selected element</button>
          <router-link :to="'/updateElement/'" tag="button" type="button" class="btn btn-primary btn-block">Update element</router-link>
        </div>
        <pre>     </pre>
        <div>
          <h4>{{ element.name }}</h4>
          <h6>{{ $t("element.group." + element.elementGroup) }}</h6>
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
            <input type="text" v-model="search" class="form-control" id="searchInput" :placeholder="$t('general.search')">
          </div>
        </form>
        <pre>     </pre>
        <div><pre></pre><router-link :to="'/element/' + element.atomicNumber" tag="button" type="button" class="btn btn-primary btn-block">View detailed information</router-link></div>
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
  import * as types from '@/store/mutation-types'

  export default {
    name: 'MyProfile-general-properties',
    props: ['element', 'preview', 'removed'],
    components: {
      Highlight, FeaturedValue, BarChart, ElementBadge, LineChart
    },
    computed: {
      ...mapState({
        debug: state => state.configuration.debug
      }),
      search: {
        get () {
          return this.$store.state.filters.search
        },
        set (value) {
          this.$store.commit(types.UPDATE_SEARCH, value)
        }
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