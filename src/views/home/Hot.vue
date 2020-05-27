<!--
 * @Date         : 2020-05-19 11:25:26
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 16:38:07
 * @FilePath     : \agent\src\views\home\Hot.vue
 * @Description  : 首页-首页
-->
<style lang="scss" scoped>
// 楼盘列表
@import "../../assets/scss/houselist.scss";
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

.swiper-wrapper{
  height: 4.04rem;
  img{
    width: 100%;
    height: 100%;
  }
}
.margintop{
  margin-top: 1.13rem;
}
</style>
<template>
  <div class="hot">
    <header>
      <div class="hot-swper">
        <!-- 顶部搜索 -->
        <div class="topsearch" @click="linkToSearch">
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
              <div class="swiper-slide"  @click.stop="swiperGo(type, floor_id)" :key="index" v-for="(banner, index) in banner_list">
                <img :src="banner.image"/>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <!-- 三个bar -->
      <div class="bar">
        <div v-for="(item, index) in navigation_list" :key="index" class="bar-cell" @click="linkTo(index)">
          <div class="pic" :style="{backgroundImage:'url(' + item.icon +')',backgroundSize:'cover'}"></div>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
    </header>

    <ul class="house-list margintop">
      <van-list
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getFloorList"
>
      <li v-for="(item) in dataList" :key="item.floor_id" class="house-list-cell" @click="openHouseDetail(item.floor_id)">
        <div class="top" :style="{backgroundImage:'url(' + item.img +')',backgroundSize:'cover'}">
          <div class="biao">优质楼盘</div>
          <div class="house-warp">{{item.name}}</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="icon"></div>
            <div class="text">{{item.map_address}}</div>
          </div>
          <div class="right">{{item.phone}}</div>
        </div>
        <div class="yong">
          <div class="pic"></div>
          <div class="rate">{{item.commission}}</div>
        </div>
        <div class="com-line"></div>
      </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { List } from 'vant'
import { directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(List)
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
      },
      // 三个bar
      navigation_list: [],
      // 轮播图列表
      banner_list: [],
      // 楼盘信息
      dataList: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  mounted () {
    this.getData()
    // this.getFloorList()
  },

  directives: {
    swiper: directive
  },
  methods: {
    linkTo (index) {
      const urlList = [
        '/home/recomment',
        '/home/mycustom',
        '/home/message'
      ]
      this.$router.push(urlList[index])
    },
    linkToSearch () {
      this.$router.push({
        name: 'Search'
      }).catch(err => { console.log(err) })
    },
    openHouseDetail (id) {
      this.$router.push({
        name: 'HouseDetail',
        query: {
          floor_id: id
        }
      })
    },
    // 获取首页数据
    getData () {
      this.WR.post('/home/getHomePageData', {})
        .then(rs => {
          // console.log(rs)
          if (rs.code === 0) {
            this.navigation_list = rs.data.navigation_list
            this.banner_list = rs.data.banner_list
            // console.log(this.navigation_list)
          }
        })
    },
    // 获取楼盘列表
    getFloorList () {
      this.page++
      // console.log(this.page)
      this.WR.post('/Floor_List/getFloorList', {
        page: this.page,
        row: 5
      })
        .then(rs => {
          // console.log(rs)
          if (rs.code === 0) {
            this.dataList = this.dataList.concat(rs.data.data_list)
          }
          this.loading = false
          if (rs.data.total <= this.dataList.length) {
            this.finished = true
          }
        })
    },
    swiperGo (type, id) {
      console.log(type)
      if (type === 1) {
        return
      }
      this.openHouseDetail(id)
    }
  }
}
</script>
