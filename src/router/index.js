/*
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 15:44:44
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
        meta: { index: 1, title: '首页' },
        component: () => import('../views/home/Hot.vue')
      },
      {
        path: '/home/recomment',
        name: 'Recomment',
        meta: { index: 2, title: '推荐' },
        component: () => import('../views/home/Recomment.vue')
      },
      {
        path: '/home/user',
        name: 'User',
        meta: { index: 3, title: '用户页面' },
        component: () => import('../views/home/User.vue')
      }
    ]
  },
  {
    // 搜索
    path: '/home/search',
    name: 'Search',
    meta: { index: 4, title: '搜索' },
    component: () => import('../views/Search.vue')
  },
  {
    // 增加意向客户
    path: '/recomment/add',
    name: 'RecommentAdd',
    meta: { index: 5, title: '新增意向楼盘' },
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommentAdd.vue')
  },
  {
    // 我的消息
    path: '/home/message',
    name: 'Message',
    meta: { index: 6, title: '我的消息' },
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
    meta: { index: 7, title: '我的客户' },
    component: () => import('../views/MyCustom.vue')
  },
  {
    // 客户详情
    path: '/home/customdetail',
    name: 'CustomDetail',
    meta: { index: 8, title: '客户详情' },
    component: () => import('../views/CustomDetail.vue')
  },
  {
    // 楼盘详情
    path: '/home/housedetail',
    name: 'HouseDetail',
    meta: { index: 9, title: '楼盘详情' },
    component: () => import('../views/HouseDetail.vue')
  },
  {
    // 我的 -- 个人信息
    path: '/home/user/userinfo',
    name: 'UserInfo',
    meta: { index: 10, title: '个人信息' },
    component: () => import('../views/UserInfo.vue')
  },
  {
    // 我的 -- 设置
    path: '/home/user/setting',
    name: 'Setting',
    meta: { index: 11, title: '设置' },
    component: () => import('../views/Setting.vue')
  },
  {
    // 我的 -- 我的经纪人
    path: '/home/user/sharephoster',
    name: 'SharePhoster',
    meta: { index: 11, title: '邀请好友' },
    component: () => import('../views/SharePhoster.vue')
  },
  {
    // 我的 -- 我的邀请
    path: '/home/user/myinvite',
    name: 'MyInvite',
    meta: { index: 12, title: '我的邀请' },
    component: () => import('../views/MyInvite.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
