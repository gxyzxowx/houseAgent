<!--
 * @Date         : 2020-05-22 11:27:33
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 17:23:42
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
          <van-dropdown-item v-model="floor_id" :options="option1" @change="changeHouse"/>
        </van-dropdown-menu>
      </div>
      <!-- <div class="title">{{house}}</div> -->
    </header>
    <main>
      <div class="main-title">客户信息</div>
      <ul class="customlist">
        <li v-for="(item, index) in list" :key="index" @click="openCustomDetail(item.customer_id)">
          <div class="top">
            <div class="left">
              <div class="title">
                <span class="username">{{item.name}}</span>
                <span class="phone">{{item.phone}}</span>
                <span class="status">{{item.report_status_name}}</span>
              </div>
              <div class="house">{{item.floor_name}}</div>
            </div>
            <div class="right">{{item.business_status_name}}</div>
          </div>
          <div class="com-line"></div>
          <div class="bottom">
            <div class="left">
              <span>状态更新时间:</span>
              <span>{{item.update_time}}</span>
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
      floor_id: 0,
      option1: [
        { text: '请选择楼盘', value: 0 }
        // { text: '观音桥商贸大厦', value: 1 },
        // { text: '解放碑商业大楼', value: 2 },
        // { text: '五里店区', value: 3 }
      ],
      token: window.sessionStorage.getItem('token'),
      house: '',
      page: 0,
      list: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/Floor_List/searchFloorList', {
        keywords: ''
      }).then(rs => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          rs.data.map((item, index) => {
            this.option1.push({
              text: item.name,
              value: item.id
            })
          })
        }
      })
    },
    // 点击打开案场助理的客户详情
    openCustomDetail (id) {
      this.$router.push({
        name: 'AssistantDetail',
        query: {
          customer_id: id
        }
      })
    },
    changeHouse (val) {
      console.log(val)
      // this.house = val.name
      this.page = 1
      console.log('token：' + this.token)
      this.WR.post('/User/managerSearchCustomerList', {
        token: this.token,
        page: this.page,
        row: 10,
        floor_id: val
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          this.list = rs.data.data_list
        } else {
          alert(rs.message)
        }
      })
    }
  }
}
</script>
