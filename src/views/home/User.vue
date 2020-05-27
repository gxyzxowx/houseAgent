<!--
 * @Date         : 2020-05-19 11:36:55
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 17:23:14
 * @FilePath     : \agent\src\views\home\User.vue
 * @Description  : 我的页面
-->
<style lang="scss" scoped>
#app{
  background-color: #fff;
}
.user{
  height: 100%;
  background-color: #f7f7f7;
}
  header{
    @include rectBg(100%, 3.5rem, '../../assets/img/ubanner.png');
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      margin:.57rem;
      align-items: center;
      .pic{
        @include square(1.41rem);
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        img{
        @include square(100%);

        }
      }
      .name{
        @include font(.34rem, #fff);
      }
    }
  }
  .user{
    .setting{
      @include rectBg(.32rem, .36rem, '../../assets/img/setting.png');
      margin: .32rem;
    }
  }

  main{
    margin: .25rem .3rem;
    ul {
      margin-bottom: 1.3rem;
      li.cell{
        background: #fff;
        @include rect(100%, 1.3rem);
        border-radius: .1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;
        .left{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .pic{
            @include squareBg(.82rem, '../../assets/img/u1.png');
            margin: 0 .25rem;
          }
          .text{
            @include font(.3rem, #333);
          }
        }
        .right{
          margin-right: .25rem;
          @include rectBg(.16rem, .3rem, '../../assets/img/right.png');
        }
        &:nth-of-type(2) .pic{
          @include squareBg(.82rem, '../../assets/img/u2.png');
        }
        &:nth-of-type(3) .pic{
          @include squareBg(.82rem, '../../assets/img/u3.png');
        }
        &:nth-of-type(4) .pic{
          @include squareBg(.82rem, '../../assets/img/u4.png');
        }
        &:nth-of-type(5) .pic{
          @include squareBg(.82rem, '../../assets/img/u5.png');
        }
    }
    }
  }
</style>
<template>
  <div class="user">
    <header>
      <div class="left">
        <div class="pic">
          <img :src="data.avatar" alt="">
        </div>
        <!-- <div class="name"> 注册/ 登录</div> -->
        <div class="name">{{data.nickname}}</div>
      </div>
      <div class="right">
        <div class="setting" @click="linkToSetting"></div>
      </div>
    </header>
    <main>
      <ul>
        <li class="cell" @click="linkTo(0)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">个人信息</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(1)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的客户</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(2)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的经纪人</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(3)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的邀请</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(4)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">楼盘收藏</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" v-if="data.role==2" @click="ifBindPhone">
          <div class="left">
            <div class="pic"></div>
            <div class="text">跳转案场</div>
          </div>
          <div class="right"></div>
        </li>
      </ul>
    </main>
    <van-dialog v-model="show" title="绑定手机号" show-cancel-button @confirm="confirmBind()">
      <van-field v-model="tel" type="tel" label="手机号" />
  <van-field
  v-model="sms"
  center
  clearable
  label="短信验证码"
  placeholder="请输入短信验证码"
>
  <template #button>
    <van-button size="small" type="primary" @click="sendSms()">发送验证码</van-button>
  </template>
</van-field>
</van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Dialog, Field, Button } from 'vant'

Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
export default {
  data () {
    return {
      data: {
        avatar: '',
        create_time: null,
        id: 1,
        master_uid: 0,
        nickname: '庞',
        openid: '12123',
        phone: '',
        // 1是经纪人,
        // 2是驻场经理
        role: 2,
        sex: 2
      },
      token: window.sessionStorage.getItem('token'),
      // 绑定手机号
      show: false,
      tel: '',
      sms: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/User/getUserInfo', {
        token: this.token
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.data = rs.data
          }
        })
    },
    linkTo (type) {
      const pathName = [
        'UserInfo',
        'MyCustom',
        'SharePhoster',
        'MyInvite',
        'MyStar',
        'AssistantHome'
      ]
      this.$router.push({
        name: pathName[type]
      })
    },
    linkToSetting () {
      this.$router.push({
        name: 'Setting'
      })
    },
    // 跳转案场助理前需要绑定手机号
    ifBindPhone () {
      if (!this.data.phone) {
        this.show = true
      } else {
        this.linkTo(5)
      }
    },
    // 发送验证码
    sendSms () {
      if (!this.WR.isMobile(this.tel)) {
        Dialog({ message: '请输入正确的手机号码！' })
        return
      }
      this.WR.post('/User/sendSmsCode', {
        token: this.token,
        mobile: this.tel

      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            Dialog({ message: '发送成功！' })
          }
        })
    },
    // 确定绑定
    confirmBind () {
      if (!this.WR.isMobile(this.tel)) {
        Dialog({ message: '请输入正确的手机号码！' })
        return
      }
      if (!(this.sms)) {
        Dialog({ message: '请输入验证码！' })
        return
      }
      this.WR.post('/User/bindPhone', {
        code: this.sms,
        token: this.token,
        mobile: this.tel

      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            Dialog({ message: rs.message })
          } else {
            Dialog({ message: rs.message })
          }
        })
    }

  }
}
</script>
