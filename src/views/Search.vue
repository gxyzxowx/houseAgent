<!--
 * @Date         : 2020-05-20 17:21:31
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 14:47:45
 * @FilePath     : \agent\src\views\Search.vue
 * @Description  : 首页 -- 搜索
-->
<style lang="scss" scoped>
// 楼盘列表
@import "../assets/scss/houselist.scss";
</style>
<template>
  <div>
<form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
<div class="com-line"></div>
    <ul class="house-list">
      <li class="house-list-cell" @click="openHouseDetail()">
        <div class="top" :style="{backgroundImage:'url(' + images[0] +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">观音桥商贸中心</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">重庆市-重庆市-江北区</div>
          </div>
          <div class="right">023-88888888</div>
        </div>
        <div class="yong">
          <div class="pic"></div>
          <div class="rate">4 %</div>
        </div>
        <div class="com-line"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search } from 'vant'

Vue.use(Search)
export default {
  data () {
    return {
      images: [
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ],
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    onCancel () {
      console.log(2)
    },
    openHouseDetail () {
      this.$router.push({
        name: 'HouseDetail'
      })
    }
  }
}
</script>
