<!--
 * @Date         : 2020-05-20 16:26:27
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 15:25:18
 * @FilePath     : \agent\src\views\CustomDetail.vue
 * @Description  : 客户详情
-->
<style lang="scss" scoped>
header {
  height: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 0.25rem;
  box-shadow: 0 0.05rem 0.05rem #ededed;
  .left {
    display: flex;
    .pic {
      @include square(1.4rem);
      background-color: #eee;
      border-radius: 50%;
      overflow: hidden;
      img {
        @include square(100%);
      }
    }
    .info {
      text-align: start;
      @include font(0.32rem, #333);
      margin-left: 0.2rem;
      .name {
        margin-bottom: 0.2rem;
      }
    }
  }
  .right {
    .icons {
      display: flex;
      width: 1.8rem;
      justify-content: space-between;
      color: #e02d36;
      font-size: 0.4rem;
    }
  }
}
.line {
  padding: 0.2rem 0.24rem;
  font-size: 0.3rem;
  text-align: start;
  background-color: #fff;
  box-shadow: 0 0.05rem 0.05rem #ededed;
}
.current-status{
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  box-sizing: border-box;
  color: #999;
  margin-bottom: .2rem;
  .icon{
    font-size: .7rem;
     &.active{
    color:$c-a;
  }
  }
  .text{
    color:#333;
  }
  .mid-line{
    width: 2.5rem;
    height: 2px;
    background-color: #999;
  }
}
main {
  background: #fff;
  .title {
    display: flex;
    align-items: center;
    font-size: 0.32rem;
    padding: 0.2rem 0.24rem;
    .text {
      margin-left: 0.2rem;
    }
  }
  ul.list {
    li {
      padding: 0.25rem;
      font-size: 0.28rem;
      text-align: start;
      line-height: 0.4rem;
      .top {
        display: flex;
        align-items: center;
        .time {
          margin: 0 0.2rem;
        }
        .biao {
          background: #ffe8ea;
          color: #ff4653;
          padding: 0.03rem 0.2rem;
          border-radius: 0.05rem;
          font-size: 0.24rem;
          &.blue {
            color: rgb(35, 137, 255);
            background: rgb(215, 228, 253);
          }
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <header>
      <div class="left">
        <!-- <div class="pic">
          <img src alt />
        </div> -->
        <div class="info">
          <div class="name">客户： {{name}} （{{sex == 1? '女':'男'}}）</div>
          <div class="phone">{{phone}}</div>
        </div>
      </div>
      <div class="right">
        <div class="icons">
          <van-icon name="edit" @click="linkToRecoment()" />
          <van-icon name="qr" @click="linkToSeeCode()" />
          <a :href="'tel'+ phone">
              <van-icon name="phone-o" class="icon"/>
            </a>
        </div>
      </div>
    </header>
    <div class="line">项目： {{floor_name}}</div>
    <div class="current-status">
      <div class="baobei">
        <van-icon name="checked" class="icon" :class="{active: business_status!=6}"/>
        <div class="text">报备</div>
      </div>
      <div class="mid-line"></div>
      <div class="chengjiao">
        <van-icon name="checked"  class="icon" :class="{active: business_status==5}"/>
        <div class="text">成交</div>
      </div>
    </div>
    <div class="com-line"></div>
    <main>
      <div class="title">
        <van-icon name="label-o"/>
        <div class="text">报备信息</div>
      </div>
      <div class="com-line"></div>
      <ul class="list">
        <!-- <li>
          <div class="top">
            <van-icon name="underway-o" size=".4rem" />
            <div class="time">2020-05-20 05:22:12</div>
            <div class="biao">防截客锁定中</div>
          </div>
          <div class="bottom">
            <span>审核中</span>
            <p>保护期：截止到2020-05-20 05:22:12</p>
            <p>已提交客户资料，开发商审核中。放截客锁定中，请耐心等待。</p>
          </div>
        </li> -->
        <li v-for="(item, index) in record_list" :key="index">
          <div class="top">
            <van-icon name="underway-o" size=".4rem" />
            <div class="time">{{item.create_time}}</div>
            <div class="biao blue">{{item.content}}</div>
          </div>
          <!-- <div class="bottom">
            <span>审核中</span>
            <p>保护期：截止到2020-05-20 05:22:12</p>
            <p>已提交客户资料，开发商审核中。放截客锁定中，请耐心等待。</p>
          </div> -->
        </li>
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
      token: window.sessionStorage.getItem('token'),
      customer_id: '',
      name: '',
      phone: '',
      sex: '',
      business_status: '',
      floor_name: '',
      record_list: []
    }
  },
  mounted () {
    this.customer_id = this.$route.query.customer_id
    console.log(this.$route.query)
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/User/getCustomerDetails', {
        token: this.token,
        customer_id: this.customer_id
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          const data = rs.data
          this.name = data.name
          this.phone = data.phone
          this.sex = data.sex
          this.record_list = data.record_list
        }
      })
    },
    linkToRecoment () {
      this.$router.push({
        name: 'Recomment',
        query: {
          customer_id: this.customer_id
        }
      })
    },
    linkToSeeCode () {
      this.$router.push({
        name: 'SeeCode',
        query: {
          customer_id: this.customer_id
        }
      })
    },
    onCall () {
      console.log('打电话')
      window.href = `tel:${this.phone}`
    }
  }
}
</script>
