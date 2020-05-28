<!--
 * @Date         : 2020-05-21 14:51:13
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 11:00:08
 * @FilePath     : \agent\src\views\SharePhoster.vue
 * @Description  : 我的经纪人（分享海报）
-->
<style lang="scss" scoped>
.sharephoster{
  @include rectBg(100%, 100%, '~@/assets/img/bg.png');
  background-color: #fff;
  background-size: 100% auto;
  background-position: top;
  overflow: hidden;
  .code-pic{
    margin-top: 5.85rem;
    margin-left: calc( (100% - 3.03rem)/2);
    @include square(3.03rem);
    background: #eee;
  img{
    @include square(100%);
  }
  }
  .btn{
    margin-top: .5rem;
    @include rect(4rem, .96rem);
    background:linear-gradient(90deg,rgba(2,124,247,1),rgba(97,164,251,1));
    box-shadow:0px 17px 24px 0px rgba(112,162,255,0.48);
    border-radius: .48rem;
    @include font(.36rem, #fff);
    text-align: center;
    line-height: .96rem;
    margin-left: calc( (100% - 4rem) /2);
    letter-spacing: .03rem;
  }
  .desc{
    display: flex;
    justify-content: space-between;
    @include font(.3rem, #519DFA);
    width: 3.6rem;
    margin-top: .3rem;
    margin-left: calc( (100% - 3.6rem) /2);
  }
}
  .van-popup--center{
    background-color: rgba(0,0,0,0);
    }
    .share1{
      @include rectBg(5rem, 2.55rem, '~@/assets/img/share1.png');
    margin-bottom: 5rem;
        margin-left: 1rem;
    }
    .share2{
      margin: 0 auto;
      @include rectBg(2.55rem, 1.57rem, '~@/assets/img/share2.png');
    }
</style>
<template>
  <div class="sharephoster">
    <div class="code-pic">
      <img :src="code" alt="">
    </div>
    <div class="btn" @click="showShare = true">分享二维码</div>
    <div class="desc">
      <div class="rule" @click="openRule">邀请规则</div>
      <div class="areadly" @click="linkToMyInvite">已邀请的好友</div>
    </div>
    <van-dialog v-model="show" title="邀请规则" show-cancel-button>
  <div class="rules" v-html="rule">这是邀请规则</div>
</van-dialog>
    <van-popup v-model="showShare" @click="showShare=false">

      <div class="share1"></div>
      <div class="share2"></div>
      </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { Dialog, Popup } from 'vant'
Vue.use(Popup)
// 全局注册
Vue.use(Dialog)
export default {
  data () {
    return {
      showShare: false,
      show: false,
      rule: '',
      code: '',
      token: window.sessionStorage.getItem('token')
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/User/getUserQrcode', {
        token: this.token

      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.code = rs.data.qrocde
            this.rule = rs.data.content
          }
        })
    },
    linkToMyInvite () {
      this.$router.push({
        name: 'MyInvite'
      })
    },
    openRule () {
      this.show = true
    }
  }
}
</script>
