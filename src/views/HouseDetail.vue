<!--
 * @Date         : 2020-05-20 17:49:24
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 16:59:48
 * @FilePath     : \agent\src\views\HouseDetail.vue
 * @Description  : 楼盘详情
-->
<style lang="scss" scoped>
  header{
    background: #fff;
    // height: 3.35rem;
    img.houseimg{
      @include rect(100%, 4rem);
    }
    .house{
      padding: .2rem .5rem;
      .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;
        .title{
          @include font(.36rem, #333);
          font-weight: 700;
        }
        .pic{
          border-radius: 50%;
          border: 1px solid $c;
          @include square(.6rem);
          .icon{
            color: $c;
            font-size: .5rem;
            margin-top: .03rem;
          }
        }
      }
      .bottom{
        .title{
          @include font(.28rem, #999);
        }
        .cell{
          display: flex;
          align-items: center;
        }
        .price{
          span:nth-of-type(2){
            font-size: .3rem;
          }
        }
        .address{
          span{
            color:cornflowerblue;
          }
        }
        .info{
          margin: .15rem 0;
        }
      }
    }
  }
  main{
    padding: .24rem;
    box-sizing: border-box;
    background-color: #fff;
    border-top: .2rem solid #f7f7f7;
    text-align: start;
    .title{
      display: inline-block;
      padding: .1rem .2rem;
      @include font(.34rem, #333);
      font-weight: 700;
      text-align: start;
      background-color: #f7f7f7;
      border-radius: .05rem;
    }
    .content{
      margin: .4rem .3rem;
      text-align: start;
      @include font(.28rem, #999);

    }
  }
  footer{
    @include rect(100%, 1rem);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    background-color: #fff;
    box-shadow: 0 -.1rem .03rem #eee;
    .share, .star{
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
      .pic{
        margin-top: .1rem;
        font-size: .4rem;
      }
    }
    .recomment{
      width: 50%;
      height: 100%;
      line-height: 1rem;
      text-align: center;
      font-size: .3rem;
      color:#fff;
      background: $c;
    }
  }
</style>
<template>
  <div>
    <header>
      <img class="houseimg" src="../assets/img/banner.png" alt="">
      <div class="house">
        <div class="top">
          <div class="title">观音商业大厦</div>
          <div class="pic">
            <van-icon class="icon" name="phone" />
          </div>
        </div>
        <div class="bottom">
          <div class="price cell">
            <span class="title">均价：</span>
            <span>￥13000.00</span>
          </div>
          <div class="info cell">
            <div class="title">佣金信息：</div>
            <span>优质楼盘，佣金4%</span>
          </div>
          <div class="address cell">
            <div class="title">楼盘地址：</div>
            <span>重庆市-重庆市-江北区 <span class="icon"><van-icon name="location-o" /></span></span>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="title">
        合作规则
      </div>
      <div class="content">
        fsdfas
      </div>
    </main>
    <footer>
      <div class="share">
        <div class="pic">
          <van-icon name="share"/>
        </div>
        <div class="text">分享</div>
      </div>
      <div class="star">
        <div class="pic">
          <van-icon name="like"/>
        </div>
        <div class="text">收藏</div>
      </div>
      <div class="recomment">我要推荐</div>
    </footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {

}
</script>
