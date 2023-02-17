import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ElementProfile from '@/components/ElementProfile'
import PeriodicTable from '@/components/PeriodicTable'
import PeriodicTableOptions from '@/components/Sidebar/PeriodicTableOptions'
import ElementProfileOptions from '@/components/Sidebar/ElementProfileOptions'
import About from '@/components/About'
import GameMode from '@/components/GameMode'
import GameModeOptions from '@/components/Sidebar/GameModeOptions'
import MyProfile from '@/components/MyProfile'
import MyProfileOptions from '@/components/Sidebar/MyProfileOptions'
import Login from '@/components/Login'
// import LoginRoute from '@/components/Sidebar/LoginRoute'
import Signup from '@/components/Signup'
import Reset from '@/components/Reset'
import Verify from '@/components/Verify'
Vue.use(Router)

export default new Router({
  base: '/mendelable/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'PeriodicTable',
          components: {
            default: PeriodicTable,
            sidebar: PeriodicTableOptions
          }
        },
        {
          path: 'element/:id',
          name: 'ElementProfile',
          components: {
            default: ElementProfile,
            sidebar: ElementProfileOptions
          }
        },
        {
          path: 'game',
          name: 'GameMode',
          components: {
            default: GameMode,
            sidebar: GameModeOptions
          }
        },
        {
          path: 'about',
          name: 'About',
          component: About
        },
        {
          path: 'myProfile',
          name: 'MyProfile',
          components: {
            default: MyProfile,
            sidebar: MyProfileOptions
          }
        },
        {
          path: 'login',
          name: 'Login',
          components:
          {
            default: Login
          }
        },
        {
          path: 'Reset',
          name: 'Reset',
          components:
          {
            default: Reset
          }
        },
        {
          path: 'Signup',
          name: 'Signup',
          components:
          {
            default: Signup
          }
        },
        {
          path: 'Verify',
          name: 'Verify',
          components:
          {
            default: Verify
          }
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: 'PeriodicTable'
      }
    }
  ]
})
