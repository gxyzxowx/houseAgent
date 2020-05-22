<!--
 * @Date         : 2020-05-20 16:26:27
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 17:42:42
 * @FilePath     : \agent\src\views\CustomDetail.vue
 * @Description  : 客户详情
-->
<style lang="scss" scoped>
  header{
    height: 2rem;
    display: flex;
    justify-content: space-between;
    padding:.25rem;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: .25rem;
    box-shadow: 0 .05rem .05rem #ededed;
    .left{
      display: flex;
      .pic{
        @include square(1.4rem);
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
        img{
          @include square(100%);
        }
      }
      .info{
        @include font(.32rem, #333);
        margin-left: .2rem;
        .name{
          margin-bottom: .2rem;
        }
      }
    }
    .right{
      .icons{
        display: flex;
        width: 1.8rem;
        justify-content: space-between;
        color:#E02D36;
        font-size: .4rem;
      }
    }
  }
  .line{
      padding: .2rem .24rem;
      font-size: .3rem;
      text-align: start;
      background-color: #fff;
      box-shadow: 0 .05rem .05rem #ededed;
    }
  main{
    background: #fff;
    .title{
      display: flex;
      align-items: center;
      font-size: .32rem;
      padding: .2rem .24rem;
      .text{
        margin-left: .2rem;
      }
    }
    ul.list{
      li{
        padding:.25rem;
        font-size: .28rem;
        text-align: start;
        line-height: .4rem;
        .top{
          display: flex;
          align-items: center;
          .time{
            margin: 0 .2rem;
          }
          .biao{
             background: #FFE8EA;
            color:#FF4653;
            padding: .03rem .2rem;
            border-radius: .05rem;
            font-size: .24rem;
            &.blue{
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
        <div class="pic">
          <img src="" alt="">
        </div>
        <div class="info">
          <div class="name">曾迪迪（女）</div>
          <div class="phone">13752852442</div>
        </div>
      </div>
      <div class="right">
        <div class="icons">
          <van-icon name="edit" @click="linkToRecoment()" />
          <van-icon name="qr" @click="linkToSeeCode()" />
          <van-icon name="phone-o" />
        </div>
      </div>
    </header>
<div class="line">项目： 观音桥商贸中心</div>
<div class="com-line"></div>
    <main>
      <div class="title">
        <van-icon name="label-o" />
        <div class="text">报备信息</div>
      </div>
      <div class="com-line"></div>
      <ul class="list">
        <li>
          <div class="top">
            <van-icon name="underway-o" size=".4rem"/>
            <div class="time">2020-05-20 05:22:12</div>
            <div class="biao">防截客锁定中</div>
          </div>
          <div class="bottom">
            <span>审核中</span>
            <p>保护期：截止到2020-05-20 05:22:12</p>
            <p>已提交客户资料，开发商审核中。放截客锁定中，请耐心等待。</p>
          </div>
        </li>
                <li>
          <div class="top">
            <van-icon name="underway-o" size=".4rem" />
            <div class="time">2020-05-20 05:22:12</div>
            <div class="biao blue">报备</div>
          </div>
          <div class="bottom">
            <span>审核中</span>
            <p>保护期：截止到2020-05-20 05:22:12</p>
            <p>已提交客户资料，开发商审核中。放截客锁定中，请耐心等待。</p>
          </div>
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

    }
  },
  methods: {
    linkToRecoment () {
      this.$router.push({
        name: 'Recomment',
        query: 'abc'
      })
    },
    linkToSeeCode () {
      this.$router.push({
        name: 'SeeCode',
        query: 'abc'
      })
    }
  }
}
</script>
