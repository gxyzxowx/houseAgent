<!--
 * @Date         : 2020-05-20 17:21:31
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 16:45:16
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
            <van-list
            :immediate-check=false
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getData"
>
      <li v-for="(item) in dataList" :key="item.floor_id" class="house-list-cell" @click="openHouseDetail(item.floor_id)">
        <div class="top" :style="{backgroundImage:'url(' + item.img +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">{{item.name}}</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">{{item.map_address}}</div>
          </div>
          <div class="right">{{item.phone}}</div>
        </div>
        <div class="yong">
          <div class="pic"></div>
          <div class="rate">{{item.commission}}</div>
        </div>
        <div class="com-line"></div>
      </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, List } from 'vant'

Vue.use(Search)
Vue.use(List)
export default {
  data () {
    return {
      images: [
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ],
      value: '',
      // 楼盘信息
      dataList: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  mounted () {
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.dataList = []
      this.page = 0
      this.getData(val)
    },
    getData (val) {
      this.page++
      this.WR.post('/Floor_List/getFloorList', {
        page: this.page,
        row: 5,
        keywords: val
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
