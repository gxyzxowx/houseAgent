/*
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 17:48:12
 * @FilePath     : \agent\src\router\index.js
 * @Description  :
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
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
    // 搜索
    path: '/home/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    // 增加意向客户
    path: '/recomment/add',
    name: 'RecommentAdd',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommentAdd.vue')
  },
  {
    // 我的消息
    path: '/home/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    // 我的消息 - 列表（两项共用）
    path: '/home/messagelist',
    name: 'MessageList',
    component: () => import('../views/MessageList.vue')
  },
  {
    // 我的客户
    path: '/home/mycustom',
    name: 'MyCustom',
    component: () => import('../views/MyCustom.vue')
  },
  {
    // 客户详情
    path: '/home/customdetail',
    name: 'CustomDetail',
    component: () => import('../views/CustomDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
