<!--
 * @Date         : 2020-05-20 14:40:06
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 15:07:43
 * @FilePath     : \agent\src\views\MessageList.vue
 * @Description  : 系统消息和 客户状态变更
-->
<style lang="scss" scoped>
  .title{
    @include rect(100%, .88rem);
    background:rgb(35, 137, 255);
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .25rem;
    box-sizing: border-box;
    align-items: center;
    font-size: .3rem;
  }
  .pic{
    width: 2rem;
    text-align: start;
  }
</style>
<template>
  <div>
<div class="title">
  <div class="pic" @click="back">
    <van-icon name="arrow-left" color="#fff" size=".4rem"/>
  </div>
  <div class="text">{{title}}</div>
  <div class="pic"></div>
</div>
<main>
  <ul>
    <li></li>
  </ul>
</main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = this.$route.query.type ? '客户状态变更' : '系统消息'
  },
  methods: {
    back () {
      window.history.go(-1)
    }
  }
}
</script>
