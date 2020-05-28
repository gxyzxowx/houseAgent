<!--
 * @Date         : 2020-05-22 11:44:41
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 17:29:07
 * @FilePath     : \agent\src\views\assistant\AssistantDetail.vue
 * @Description  : 案场助理详情页
-->
<style lang="scss" scoped>
main {
  text-align: start;
  .main-title {
    text-align: start;
    font-size: 0.36rem;
    padding: 0.18rem 0.24rem;
    background: #fff;
    font-weight: 700;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #f7f7f7;
  }
  .user-content,
  .agent-content {
    background: #fff;
    padding: 0.24rem;
    .top {
      display: flex;
      img {
        @include square(1.2rem);
        border-radius: 50%;
        margin-right: 0.5rem;
        background-color: #eee;
      }
      .info {
        @include font(0.32rem, #333);
        line-height: 0.5rem;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      margin-top: 0.25rem;
      @include font(0.26rem, #666);
    }
  }
  .status {
    margin-top: 0.25rem;
    display: flex;
    .main-title {
      background: #fff;
      border: none;
    }
    .select {
      flex: 1;
    }
  }
}
footer {
  position: fixed;
  left: 0;
  bottom: 2rem;
  width: 100%;
}
.footer-btn {
  margin: 0 auto;
  width: 2.5rem;
}
</style>
<template>
  <div>
    <main>
      <!-- 客户信息 -->
      <div class="main-title">客户信息</div>
      <div class="user-content">
        <div class="top">
          <!-- <img src="../../assets/img/home11.png" alt /> -->
          <div class="info">
            <div class="username">{{data.name}}</div>
            <div class="phone">{{data.phone}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="time-text">预计到访时间：</div>
          <div class="time">{{data.visiting_time}}</div>
        </div>
      </div>
      <!-- 经纪人信息 -->
      <div class="main-title">经纪人信息</div>
      <div class="agent-content">
        <div class="top">
          <img :src="data.avatar" alt />
          <div class="info">
            <div class="username">{{data.nickname}}</div>
            <div class="phone">{{data.user_phone}}</div>
          </div>
        </div>
      </div>

      <!-- 客户状态 -->
      <div class="status">
        <div class="main-title">客户状态：</div>
        <div class="select">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" :disabled="data.business_status!=1" />
          </van-dropdown-menu>
        </div>
      </div>
    </main>

    <footer>
      <van-button type="info" size="large" class="footer-btn" v-if="data.business_status==1" @click="saveStatus()">保存</van-button>
    </footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem, Button, Toast } from 'vant'

Vue.use(Toast)
Vue.use(Button)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
export default {
  data () {
    return {
      value1: 0,
      option1: [
        { text: '选择状态', value: 0 },
        { text: '到访', value: 1 }
      ],
      token: window.sessionStorage.getItem('token'),
      customer_id: '',
      data: {
        // id: 4,
        // name: '小欧',
        // sex: 1,
        // visiting_time: 2147483647,
        // floor_id: 2,
        // phone: '13666666666',
        // business_status: 1,
        // report_status: 1,
        // uid: 1,
        // create_time: 1590544976,
        // update_time: 1590544976,
        // nickname: '庞',
        // user_phone: '',
        // avatar: '',
        // business_status_name: '已报备'
      }
    }
  },
  mounted () {
    console.log(this.$route.query)
    this.customer_id = this.$route.query.customer_id
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/User/getManagerCustomerDetails', {
        token: this.token,
        customer_id: this.customer_id
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          rs.data.visiting_time = this.getformatDate(rs.data.visiting_time)
          this.data = rs.data
          if (this.data.report_status !== 1) {
            this.option1[0].text = this.data.business_status_name
          }
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
    // 保存
    saveStatus () {
      this.WR.post('/User/managerUpdateCustomerStatus', {
        token: this.token,
        customer_id: this.customer_id
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          Toast('状态更改成功！')
          this.getData()
        }
      })
    }
  }
}
</script>
