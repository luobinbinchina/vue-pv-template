import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ApplicationGroup from './views/ApplicationGroup.vue'
import ApplyName from './views/ApplyName.vue'
import StrategyGroup from './views/StrategyGroup.vue'
import DemotePoint from './views/DemotePoint.vue'
import SettingUp from './views/SettingUp.vue'
import DowngradeChart from './views/DowngradeChart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/applicationGroup',
      name: 'applicationGroup',
      component: ApplicationGroup
    },
    {
      path: '/applyName',
      name: 'applyName',
      component: ApplyName
    },
    {
      path: '/strategyGroup',
      name: 'applyName',
      component: StrategyGroup
    },
    {
      path: '/demotePoint',
      name: 'demotePoint',
      component: DemotePoint
    },
    {
      path: '/settingUp',
      name: 'settingUp',
      component: SettingUp
    },
    {
      path: '/downgradeChart',
      name: 'downgradeChart',
      component: DowngradeChart
    },
    {
      path: '/',
      name: 'redirect',
      redirect: '/applicationGroup'
    }
  ]
})
