<!--
 * @Date         : 2020-05-20 14:40:06
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 16:26:56
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
        <van-list
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getData"
>
  <van-cell-group>
  <van-cell v-for="(item,index) in dataList" :key="index" icon="chat-o" :title="item.content" :value="item.create_time" />
</van-cell-group>
 </van-list>
</main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon, Cell, CellGroup, List } from 'vant'
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
export default {
  data () {
    return {
      title: '',
      type: '',
      token: window.sessionStorage.getItem('token'),
      dataList: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  created () {
    //  2客户  1系统
    this.type = this.$route.query.type
    if (this.type === 1) {
      this.title = '系统消息'
    } else {
      this.title = '客户状态变更'
    }
    this.getData()
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    getData () {
      this.page++
      this.WR.post('/User/getUserMessageList', {
        token: this.token,
        page: this.page,
        row: 5,
        type: this.type
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
