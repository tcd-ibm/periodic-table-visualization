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
import AddElement from '@/components/AddElement'
import UpdateElement from '@/components/UpdateElement'
import MyProfile from '@/components/MyProfile'
import MyProfileOptions from '@/components/Sidebar/MyProfileOptions'
import Login from '@/components/Login'
import VerificationPage from '@/components/VerificationPage'
// import Confirmation from '@/components/Confirmation'
import Signup from '@/components/Signup'
import Reset from '@/components/Reset'
import ResetPassword from '@/components/ResetPassword'
import UserElementDescription from '@/components/UserElementDescription'
import ErrorPage from '@/components/ErrorPage'
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
          path: 'addElement/:position',
          name: 'AddElement',
          components: {
            default: AddElement
          }
        },
        {
          path: 'updateElement',
          name: 'updateElement',
          components: {
            default: UpdateElement
          }
        },
        {
          path: 'userElementDescription',
          name: 'userElementDescription',
          components: {
            default: UserElementDescription
          }
        },
        {
          path: 'error',
          name: 'ErrorPage',
          components: {
            default: ErrorPage
          }
        },
        {
          path: 'Login',
          name: 'Login',
          components: {
            default: Login
          }
        },
        {
          path: 'ResetPassword/:userID',
          name: 'ResetPassword',
          components: {
            default: ResetPassword
          }
        },
        {
          path: 'reset',
          name: 'Reset',
          components: {
            default: Reset
          }
        },
        {
          path: 'Signup',
          name: 'Signup',
          components: {
            default: Signup
          }
        },
        {
          path: 'verify/:confirmationCode',
          name: 'VerificationPage',
          components: {
            default: VerificationPage
          }
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: 'ErrorPage'
      }
    }
  ]
})
