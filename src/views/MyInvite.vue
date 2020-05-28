<!--
 * @Date         : 2020-05-21 15:43:06
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 11:07:00
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
            <van-list
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getData()"
>
      <li v-for="(item, index) in dataList" :key="index">
        <div class="left">
<div class="pic">
          <img :src="item.avatar" alt="">
        </div>
        <div class="name">{{item.nickname}}</div>
        </div>
        <div class="right">
          {{item.phone}}
        </div>
      </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, List } from 'vant'

Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      dataList: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    getData () {
      this.page++
      this.WR.post('/User/getUserInviteList', {
        token: this.token,
        page: this.page,
        row: 20

      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.dataList = this.dataList.concat(rs.data.data_list)
          }
          this.loading = false
          if (rs.data.total <= this.dataList.length) {
            this.finished = true
          }
        })
    }
  }
}
</script>
