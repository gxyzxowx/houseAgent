<!--
 * @Date         : 2020-05-22 09:36:30
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 11:20:57
 * @FilePath     : \agent\src\views\MyStar.vue
 * @Description  : 我的收藏
-->
<style lang="scss" scoped>
  ul.list{
    background: #fff;
    li{
      padding:.24rem;
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid #eee;

      .pic{
        @include rect(100%, 2.8rem);
        border-radius: .1rem;
        overflow: hidden;
        display: flex;
        flex-direction: column-reverse;
        .bar{
          @include rect(100%, .6rem);
          background-color: rgba(0,0,0,.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 .24rem;
          box-sizing: border-box;
          .house-name{
            color:#fff;
            font-size: .28rem;
          }
          .star{
            color: #ddd;
            font-size: .32rem;
            &.active{
              color: $c-a;
            }
          }
        }
      }
      .content{
        display: flex;
        justify-content: space-between;
        padding: .25rem 0;
        .left{
          .address, .yong{
            display: flex;
            align-items: center;
          }
          .address{
            .icon{
              font-size: .3rem;
              margin-right: .15rem;
              color: #999;
            }
          }
          .yong{
            margin-top: .15rem;
            .icon{
              padding:0.02rem .08rem;
              background-color: $c-a;
              color:#fff;
              margin-right: .15rem;
            }
            span{
              color:darkgoldenrod;
            }
          }
        }
        .right{
          @include rect(2rem, .6rem);
          line-height: .6rem;
          background-color: $c-a;
          @include font(.3rem, #fff);
          text-align: center;
          border-radius: .4rem;
        }
      }
    }
  }
</style>
<template>
  <div>
    <ul class="list">
      <li @click="linkToDetail()">
        <div class="pic" :style="{backgroundImage: 'url(' + images[0] + ')',backgroundSize: 'cover'}">
          <div class="bar">
            <div class="house-name">观音桥商贸大厦</div>
            <div class="star active">
              <van-icon name="like" />
            </div>
          </div>
          </div>
        <div class="content">
          <div class="left">
            <div class="address">
              <div class="icon"><van-icon name="location-o" /></div>
              <span>重庆市-重庆市-江北区</span>
            </div>
            <div class="yong">
              <div class="icon">佣</div>
              <span>优质楼盘，佣金4%</span>
            </div>
          </div>
          <div class="right">推荐客户</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  data () {
    return {
      images: [
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ]
    }
  },
  methods: {
    linkToDetail () {
      this.$router.push({
        name: 'HouseDetail'
      })
    }
  }
}
</script>
