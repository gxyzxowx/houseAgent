<!--
 * @Date         : 2020-05-21 14:20:14
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 14:39:17
 * @FilePath     : \agent\src\views\Setting.vue
 * @Description  : 我的 -- 设置
-->
<style lang="scss" scoped>
.van-cell__title {
  text-align: start;
  text-indent: 0.1rem;
}
.exit{
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <van-cell-group>
      <van-cell title="更改手机号码" :value="tel" is-link @click="show =!show"/>
    </van-cell-group>

      <!-- 填写手机号 -->
    <!-- <van-dialog v-model="show" title="更改手机号" show-cancel-button @confirm="changePhone">
      <div class="editname">
        <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号"/>
      </div>
    </van-dialog> -->

    <van-button type="danger" class="exit">退出登录</van-button>
        <van-dialog v-model="show" title="修改新的手机号码" show-cancel-button @confirm="confirmBind()">
      <van-field v-model="tel" type="tel" label="手机号" />
  <van-field
  v-model="sms"
  center
  clearable
  label="短信验证码"
  placeholder="请输入短信验证码"
>
  <template #button>
    <van-button size="small" type="primary" @click="sendSms()" v-show="showsms">发送验证码</van-button>
  </template>
</van-field>
</van-dialog>
  </div>

</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Field, Dialog, Button } from 'vant'

Vue.use(Button)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      showsms: true,
      token: window.sessionStorage.getItem('token'),
      // 绑定手机号
      show: false,
      tel: '',
      sms: ''
    }
  },
  methods: {
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
            this.showsms = false
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
