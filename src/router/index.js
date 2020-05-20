/*
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 11:56:15
 * @FilePath     : \agent\src\router\index.js
 * @Description  :
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/hot',
        name: 'Hot',
        component: () => import('../views/home/Hot.vue')
      },
      {
        path: '/home/recomment',
        name: 'Recomment',
        component: () => import('../views/home/Recomment.vue')
      },
      {
        path: '/home/user',
        name: 'User',
        component: () => import('../views/home/User.vue')
      }
    ]
  },
  {
    path: '/recomment/add',
    name: 'RecommentAdd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommentAdd.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
