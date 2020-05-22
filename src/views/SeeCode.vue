<!--
 * @Date         : 2020-05-21 15:05:59
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 10:40:57
 * @FilePath     : \agent\src\views\SeeCode.vue
 * @Description  : 带看二维码
-->
<style lang="scss" scoped>
.seecode{
  background: #fff;
  height: 100vh;
}
  ul.list{
    li{
      @include rect(100%, .8rem);
      border-bottom: 1px solid #eee;
      padding: 0 .24rem;
      box-sizing: border-box;
      text-align: start;
      display: flex;
      align-items: center;
      .name{
        font-size: .3rem;
        font-weight: 700;
        margin-right: .24rem;
      }
      .content{
        font-size: .3rem;
      }
    }
  }
  p.desc{
    text-align: center;
    margin:.24rem;
  }
  .code-pic{
    margin:.5rem auto;
    @include square(3rem);
    background: #eee;
    img{
      @include square(100%);
    }
  }
  footer{
    margin: 0 .3rem;
    border-radius: .12rem;
    @include font(.32rem, $c);
    border: 1px solid $c;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
  }
  p.low{
    margin-top: .8rem;
    text-align: center;
    @include font(.26rem, #999);
  }
</style>
<template>
  <div class="seecode">
    <ul class="list">
      <li>
        <div class="name">项目名称：</div>
        <div class="content">观音桥商贸大厦</div>
      </li>
      <li>
        <div class="name">客户姓名：</div>
        <div class="content">曾迪</div>
      </li>
      <li>
        <div class="name">客户电话：</div>
        <div class="content">13755555256</div>
      </li>
      <li>
        <div class="name">报备时间：</div>
        <div class="content">2020-05-21 15：23：31</div>
      </li>
      <li>
        <div class="name">线索状态：</div>
        <div class="content">待确定</div>
      </li>
    </ul>
    <p class="desc">出示二维码给案场助理 扫码确认带看</p>
    <div class="code-pic">
      <img src="" alt="">
    </div>
    <footer>分享带看二维码</footer>
    <p class="low">可将二维码分享给实际带看客户的协作者</p>
  </div>
</template>
<script>
export default {

}
</script>
