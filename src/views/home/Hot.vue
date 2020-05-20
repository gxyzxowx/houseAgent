<!--
 * @Date         : 2020-05-19 11:25:26
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 14:01:34
 * @FilePath     : \agent\src\views\home\Hot.vue
 * @Description  : 首页-首页
-->
<style lang="scss" scoped>
.hot {
  background-color: #f7f7f7;
}
.swiper {
  @include rectBg(100%, 4.04rem, "../../assets/img/banner.png");
}
header {
  height: 4.04rem;
  width: 100%;
  position: relative;

  .hot-swper {
    .topsearch {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 0.18rem 0.24rem;
      width: 100%;
      box-sizing: border-box;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1.3rem;
        @include font(0.3rem, #fff);
        margin-right: 0.1rem;
        .icon {
          @include rectBg(0.24rem, 0.3rem, "../../assets/img/where.png");
        }
        .arrow {
          @include rectBg(0.16rem, 0.08rem, "../../assets/img/bot.png");
        }
      }
      .mid {
        display: flex;
        align-items: center;
        @include rect(4rem, 0.6rem);
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0.05rem 0.08rem 0px rgba(0, 0, 0, 0.06);
        border-radius: 0.3rem;
        .icon {
          @include squareBg(0.24rem, "../../assets/img/search.png");
          margin: 0 0.1rem 0 0.24rem;
        }
        .text {
          @include font(0.24rem, #fff);
        }
      }
      .right {
        @include rect(1.08rem, 0.6rem);
        background: linear-gradient(
          90deg,
          rgba(255, 165, 106, 1) 0%,
          rgba(255, 130, 80, 1) 100%
        );
        border-radius: 0.3rem;
        line-height: 0.6rem;
        text-align: center;
        @include font(0.24rem, #fff);
      }
    }
  }
  // bar
  .bar {
    width: calc(100% - 0.48rem);
    height: 1.9rem;
    background-color: #fff;
    position: absolute;
     z-index: 2;
    bottom: -1rem;
    left: 0.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.21rem 0.85rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
    .bar-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      .pic {
        @include squareBg(1.06rem, "../../assets/img/receive.png");
      }
      .text {
        @include font(0.24rem, #333);
        margin-top: 0.08rem;
      }
      &:nth-of-type(2) .pic {
        background-image: url("../../assets/img/store.png");
      }
      &:nth-of-type(3) .pic {
        background-image: url("../../assets/img/entry.png");
      }
    }
  }
}
ul.house-list {
  margin-top: 1.13rem;
  background: #fff;
  overflow: hidden;
  margin-bottom: 0.88rem;
  li.house-list-cell {
    .top {
      width: calc(100% - 0.48rem);
      margin: 0.24rem;
      border-radius: 0.3rem;
      position: relative;
      overflow: hidden;
      height: 2.8rem;
      .biao {
        margin: 0.16rem;
        padding: 0.07rem 0.16rem;
        background: rgba(0, 0, 0, 0.4);
        @include font(0.24rem, #fff);
        border-radius: 0.25rem;
        width: 1.26rem;
      }
      .house-warp {
        @include rect(100%, 0.7rem);
        background: rgba(0, 0, 0, 0.4);
        padding: 0.2rem 0.24rem;
        box-sizing: border-box;
        @include font(0.24rem, #f3f3f3);
        position: absolute;
        bottom: 0;
        text-align: left;
      }
    }
    .bottom {
      display: flex;
      padding: 0 0.24rem;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.24rem;
      .left {
        display: flex;
        @include font(0.3rem, #333);
        .icon {
          @include rectBg(0.24rem, 0.3rem, "../../assets/img/where1.png");
          margin-top: 0.05rem;
          margin-right: 0.15rem;
        }
      }
      .right {
        background: linear-gradient(
          90deg,
          rgba(97, 164, 251, 0.8),
          rgba(2, 124, 247, 0.8)
        );
        opacity: 0.6;
        border-radius: 0.25rem;
        @include font(0.24rem, #fff);
        padding: 0.1rem 0.16rem;
      }
    }
  }
}
.swiper-wrapper{
  height: 4.04rem;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="hot">
    <header>
      <div class="hot-swper">
        <!-- 顶部搜索 -->
        <div class="topsearch">
          <div class="left">
            <div class="icon"></div>
            <div class="text">重庆</div>
            <div class="arrow"></div>
          </div>
          <div class="mid">
            <div class="icon"></div>
            <div class="text">请输入楼盘信息</div>
          </div>
          <div class="right">搜索</div>
        </div>
        <!-- 轮播图 -->
        <div class="swiper">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :key="banner" v-for="banner in images">
                <img :src="banner" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <!-- 三个bar -->
      <div class="bar">
        <div class="bar-cell" @click="linkRecomment">
          <div class="pic"></div>
          <div class="text">推荐客户</div>
        </div>
        <div class="bar-cell">
          <div class="pic"></div>
          <div class="text">我的客户</div>
        </div>
        <div class="bar-cell">
          <div class="pic"></div>
          <div class="text">我的消息</div>
        </div>
      </div>
    </header>

    <ul class="house-list">
      <li class="house-list-cell">
        <div class="top" :style="{backgroundImage:'url(' + images[0] +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">观音桥商贸中心</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">重庆市-重庆市-江北区</div>
          </div>
          <div class="right">023-88888888</div>
        </div>
        <div class="com-line"></div>
      </li>
      <li class="house-list-cell">
        <div class="top" :style="{backgroundImage:'url(' + images[0] +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">观音桥商贸中心</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">重庆市-重庆市-江北区</div>
          </div>
          <div class="right">023-88888888</div>
        </div>
        <div class="com-line"></div>
      </li>
      <li class="house-list-cell">
        <div class="top" :style="{backgroundImage:'url(' + images[0] +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">观音桥商贸中心</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">重庆市-重庆市-江北区</div>
          </div>
          <div class="right">023-88888888</div>
        </div>
        <div class="com-line"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import { directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  data () {
    return {
      images: [
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ],
      swiperOption: {
        loop: true,
        pagination: {

          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 3000, // 秒
          stopOnLastSlide: false,
          disableOnInteraction: false // 滑动不会失效
        }
        // ...
      }
    }
  },
  mounted () {
    // console.log('Current Swiper instance object', this.mySwiper)
    // this.mySwiper.slideTo(3, 1000, false)
  },

  directives: {
    swiper: directive
  },
  methods: {
    linkRecomment () {
      this.$router.push('/home/recomment')
    }
  }
}
</script>
