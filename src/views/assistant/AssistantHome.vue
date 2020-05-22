<!--
 * @Date         : 2020-05-22 11:27:33
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 12:34:41
 * @FilePath     : \agent\src\views\assistant\AssistantHome.vue
 * @Description  : 案场助理
-->
<style lang="scss" scoped>
@import "~@/assets/scss/customlist.scss";
header {
  height: 1rem;
  background-color: #fff;
  padding: 0 0.24rem;
  box-sizing: border-box;
  display: flex;
  font-size: 0.3rem;
  align-items: center;
}
.select {
  width: 2.5rem;
}
main{
  .main-title{
    text-align: start;
    font-size: .36rem;
    padding:.18rem .24rem;
    background: #fff;
    font-weight: 700;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #f7f7f7;
  }
}
</style>
<template>
  <div>
    <header>
      <div class="select">
        <van-dropdown-menu>
          <van-dropdown-item title="选择楼盘" v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="title">{{house}}</div>
    </header>
    <main>
      <div class="main-title">客户信息</div>
      <ul class="customlist">
        <li @click="openCustomDetail()">
          <div class="top">
            <div class="left">
              <div class="title">
                <span class="username">曾小迪</span>
                <span class="phone">13752565231</span>
                <span class="status">待确认</span>
              </div>
              <div class="house">观音桥中心城</div>
            </div>
            <div class="right">报备</div>
          </div>
          <div class="com-line"></div>
          <div class="bottom">
            <div class="left">
              <span>状态更新时间:</span>
              <span>2020-05-20 12:11:52</span>
            </div>
            <div class="right">
              <!-- <van-icon name="like" size=".4rem"/> -->
              <van-icon name="edit" size=".4rem" @click="recommentIt()" />
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon, DropdownMenu, DropdownItem } from 'vant'

Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
export default {
  data () {
    return {
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      house: ''
    }
  },
  methods: {
    // 点击打开客户详情
    openCustomDetail () {
      this.$router.push({
        name: 'CustomDetail',
        query: 'abc'
      })
    }
  }
}
</script>
