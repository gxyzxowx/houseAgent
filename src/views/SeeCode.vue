<!--
 * @Date         : 2020-05-21 15:05:59
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-27 17:36:39
 * @FilePath     : \agent\src\views\SeeCode.vue
 * @Description  : 带看二维码
-->
<style lang="scss" scoped>
.seecode {
  background: #fff;
  height: 100vh;
}
ul.list {
  li {
    @include rect(100%, 0.8rem);
    border-bottom: 1px solid #eee;
    padding: 0 0.24rem;
    box-sizing: border-box;
    text-align: start;
    display: flex;
    align-items: center;
    .name {
      font-size: 0.3rem;
      font-weight: 700;
      margin-right: 0.24rem;
    }
    .content {
      font-size: 0.3rem;
    }
  }
}
p.desc {
  text-align: center;
  margin: 0.24rem;
}
.code-pic {
  margin: 0.5rem auto;
  @include square(3rem);
  background: #eee;
  img {
    @include square(100%);
  }
}
footer {
  margin: 0 0.3rem;
  border-radius: 0.12rem;
  @include font(0.32rem, $c);
  border: 1px solid $c;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
}
p.low {
  margin-top: 0.8rem;
  text-align: center;
  @include font(0.26rem, #999);
}
</style>
<template>
  <div class="seecode">
    <ul class="list">
      <li>
        <div class="name">项目名称：</div>
        <div class="content">{{item.floor_name}}</div>
      </li>
      <li>
        <div class="name">客户姓名：</div>
        <div class="content">{{item.name}}</div>
      </li>
      <li>
        <div class="name">客户电话：</div>
        <div class="content">{{item.phone}}</div>
      </li>
      <li>
        <div class="name">报备时间：</div>
        <div class="content">{{item.create_time}}</div>
      </li>
      <li>
        <div class="name">线索状态：</div>
        <div class="content">{{item.business_status_name}}</div>
      </li>
    </ul>
    <p class="desc">出示二维码给案场助理 扫码确认带看</p>
    <div class="code-pic">
      <img :src="item.qrocde" alt />
    </div>
    <footer>分享带看二维码</footer>
    <p class="low">可将二维码分享给实际带看客户的协作者</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      customer_id: '',
      item: {
        // id: 5,
        // name: '小姑姑',
        // sex: 1,
        // visiting_time: 1590912300,
        // floor_id: 1,
        // phone: '13755555555',
        // business_status: 1,
        // report_status: 1,
        // uid: 1,
        // create_time: '2020-05-27 16:06:15',
        // update_time: 1590566775,
        // business_status_name: '已报备',
        // qrocde: 'http://fangchan.caimaomeng.com/uplodas/qrcode/5.png'
      }
    }
  },
  mounted () {
    this.customer_id = this.$route.query.customer_id
    this.getData()
  },
  methods: {
    getData () {
      console.log(this.customer_id)
      this.WR.post('/User/getCustomerQrcodePage', {
        token: this.token,
        customer_id: this.customer_id
      }).then(rs => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.item = rs.data
        }
      })
    }
  }
}
</script>
