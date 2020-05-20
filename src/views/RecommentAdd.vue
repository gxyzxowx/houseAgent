<!--
 * @Date         : 2020-05-20 11:48:05
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 14:11:30
 * @FilePath     : \agent\src\views\RecommentAdd.vue
 * @Description  : 推荐客户--新增意向楼盘
-->
<style lang="scss" scoped>
.recoment-add{
  main{
    .title{
      @include font(.3rem, #333);
      text-align: start;
      padding: .1rem .24rem;
    }
  }
}
</style>
<template>
  <div class="recoment-add">
    <div class="search">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入楼盘名称"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <main>
    <div class="title">重庆市</div>
    <ul class="list">
      <li>

        <van-cell-group>
  <van-cell value="[江北区] 观音桥商贸中心" />
</van-cell-group>
      </li>
    </ul>
    </main>

  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Search)
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      console.log('你点击了搜索:' + val)
    },
    onCancel () {
      console.log('你点击了取消')
    }
  }
}
</script>
