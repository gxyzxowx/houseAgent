/*
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-19 10:39:21
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
import '@/assets/js/wr.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
