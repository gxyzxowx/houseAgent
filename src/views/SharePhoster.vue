<!--
 * @Date         : 2020-05-21 14:51:13
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 15:06:31
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
</style>
<template>
  <div class="sharephoster">
    <div class="code-pic">
      <img src="" alt="">
    </div>
    <div class="btn">分享二维码</div>
    <div class="desc">
      <div class="rule" @click="openRule">邀请规则</div>
      <div class="areadly" @click="linkToMyInvite">已邀请的好友</div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {

    }
  },
  methods: {
    linkToMyInvite () {
      this.$router.push({
        name: 'MyInvite'
      })
    },
    openRule () {
      Dialog.alert({
        title: '邀请规则',
        message: '这是邀请规则'
      })
    }
  }
}
</script>
