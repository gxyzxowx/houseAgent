<!--
 * @Date         : 2020-05-22 11:27:33
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 14:05:25
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
  width: 100%;
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
          <van-dropdown-item v-model="houseVal" :options="option1" @change="changeHouse"/>
        </van-dropdown-menu>
      </div>
      <!-- <div class="title">{{house}}</div> -->
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
      houseVal: 0,
      option1: [
        { text: '请选择楼盘', value: 0 },
        { text: '观音桥商贸大厦', value: 1 },
        { text: '解放碑商业大楼', value: 2 },
        { text: '五里店区', value: 3 }
      ],
      house: ''
    }
  },
  methods: {
    // 点击打开案场助理的客户详情
    openCustomDetail () {
      this.$router.push({
        name: 'AssistantDetail',
        query: 'abc'
      })
    },
    changeHouse (val, val1) {
      console.log(val, val1)
      this.house = val.name
    }
  }
}
</script>
