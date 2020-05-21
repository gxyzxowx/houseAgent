<!--
 * @Date         : 2020-05-21 15:43:06
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 15:51:34
 * @FilePath     : \agent\src\views\MyInvite.vue
 * @Description  : 我的 -- 我的邀请
-->
<style lang="scss" scoped>
  ul.list{
    li{
      background: #fff;
      @include rect(100%, .88rem);
      padding: 0 .24rem;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .3rem;
      .left{
        display: flex;
        align-items: center;
      }
      .pic{
        @include square(.6rem);
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
      }
    }
  }
</style>
<template>
  <div>
    <ul class="list">
      <li>
        <div class="left">
<div class="pic">
          <img src="" alt="">
        </div>
        <div class="name">曾老师</div>
        </div>
        <div class="right">
13752852112
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {

    }
  }
}
</script>
