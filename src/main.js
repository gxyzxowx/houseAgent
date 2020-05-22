/*
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 15:34:04
 * @FilePath     : \agent\src\main.js
 * @Description  :
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入rem.js
import '@/assets/js/rem.js'
// 引入公共函数
import WR from '@/assets/js/wr.js'

Vue.config.productionTip = false
Vue.prototype.WR = WR
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
