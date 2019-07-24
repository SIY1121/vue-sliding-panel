import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/start',
      name: 'quickstart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/QuickStart.vue')
    },
    {
      path: '/examples/ShareComponent',
      name: 'sharecomponent',
      component: () => import('./views/examples/ShareComponent.vue')
    },
    {
      path: '/examples/SideBar',
      name: 'sidebar',
      component: () => import('./views/examples/SideBar.vue')
    },
    {
      path: '/props',
      name: 'props',
      component: () => import('./views/Props.vue')
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('./views/EventHandling.vue')
    }
  ]
})
