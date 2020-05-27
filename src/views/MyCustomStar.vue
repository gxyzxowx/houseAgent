<!--
 * @Date         : 2020-05-27 15:03:39
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-27 15:17:51
 * @FilePath     : \agent\src\views\MyCustomStar.vue
 * @Description  : 我关注的用户
-->
<style lang="scss" scoped>
@import '~@/assets/scss/customlist.scss';
</style>
<template>
  <div>
 <main>
      <ul class="customlist">
        <li v-for="(item, index) in list" :key="item.customer_id" @click="openCustomDetail(item.customer_id)">
          <div class="top">
            <div class="left">
              <div class="title">
                <span class="username">{{item.customer_name}}</span>
                <span class="phone">{{item.phone}}</span>
                <span class="status">{{item.report_status_name}}</span>
              </div>
              <div class="house">{{item.floor_name}}</div>
            </div>
            <div class="right">{{item.business_status_name}}</div>
          </div>
          <div class="com-line"></div>
          <div class="bottom">
            <div class="left"><span>状态更新时间:</span><span>{{item.update_time}}</span></div>
            <div class="right">
              <van-icon :class="{red: item.is_concern}" name="like" size=".4rem" @click.stop ="starCustom(index, item.customer_id)" class="like"/>
              <van-icon name="edit"  size=".4rem" @click.stop ="recommentIt(item.customer_id)"/>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, DropdownMenu, DropdownItem, Cell, Icon, Calendar, Toast } from 'vant'

Vue.use(Toast)
Vue.use(Calendar)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Search)
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('token'),
      page: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.page++
      console.log(this.token)
      console.log(this.value2b, this.value2e)
      this.WR.post('/User/getUserConcernList', {
        token: this.token,
        page: this.page,
        row: 10
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            const data = rs.data
            data.map((item, index) => {
              // 时间转换
              data[index].update_time = this.getformatDate(data[index].update_time)
              data[index].is_concern = 1
            })
            this.list = this.list.concat(data)
            // console.log(data)
          }
        })
    },
    // 得到时间
    getformatDate (timestamp) {
      var add0 = function (data) {
        if (String(data).length === 1) {
          return `0${data}`
        } else {
          return data
        }
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      timestamp = timestamp * 1000
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds)
    },
    // 点击编辑跳转到编辑推荐客户
    recommentIt (id) {
      this.$router.push({
        name: 'Recomment',
        query: { customer_id: id }
      })
    },
    // 点击打开客户详情
    openCustomDetail (id) {
      this.$router.push({
        name: 'CustomDetail',
        query: {
          customer_id: id
        }
      })
    },
    // 取消收藏客户
    starCustom (index, id) {
      this.WR.post('/User/userConcernCustomer', {
        token: this.token,
        customer_id: id
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.list.splice(index, 1)
            Toast('取消关注成功！')
          } else {
            Toast(rs.message)
          }
        })
    }
  }
}
</script>
