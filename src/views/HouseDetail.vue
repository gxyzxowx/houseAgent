<!--
 * @Date         : 2020-05-20 17:49:24
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-27 16:14:28
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
        &.red{
          color:$c-a;
        }
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
      <img class="houseimg" :src="data.img" alt="">
      <div class="house">
        <div class="top">
          <div class="title">{{data.name}}</div>
          <div class="pic" @click="onCall()">
            <van-icon class="icon" name="phone" />
          </div>
        </div>
        <div class="bottom">
          <div class="price cell">
            <span class="title">均价：</span>
            <span>￥{{data.price}}</span>
          </div>
          <div class="info cell">
            <div class="title">佣金信息：</div>
            <span>优质楼盘，佣金{{data.commission}}</span>
          </div>
          <div class="address cell">
            <div class="title">楼盘地址：</div>
            <span @click="onMap()">{{data.map_address}} <span class="icon"><van-icon name="location-o" /></span></span>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="title">
        合作规则
      </div>
      <div class="content">
        {{data.cooperationrules}}
      </div>
    </main>
    <footer>
      <div class="share">
        <div class="pic">
          <van-icon name="share"/>
        </div>
        <div class="text">分享</div>
      </div>
      <div class="star" @click="onStar()">
        <div class="pic" :class="{red:data.is_collect}">
          <van-icon name="like" />
        </div>
        <div class="text">收藏</div>
      </div>
      <div class="recomment" @click="linkToRecomment()">我要推荐</div>
    </footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon, Toast } from 'vant'

Vue.use(Toast)
Vue.use(Icon)
export default {
  data () {
    return {
      query: {},
      token: window.sessionStorage.getItem('token'),
      data: {
        // commission: '4%',
        // cooperationrules: '1、房地产转让、抵押时，房屋所有权和该房屋占用范围内的土地使用权同时转让、抵押。这就是“房产权与地产权一同交易规则”。房产权与地产权是不能分割的，同一房地产的房屋所有权与土地使用权只能由同一主体享有，而不能由两个主体分别享有;如果由两个主体分别享有，他们的权利就会发生冲突，各自的权利都无法行使。在房地产交易中只有遵循这一规则，才能保障交易的安全、公平。',
        // img: '2',
        // latitude: '29.540528820664',
        // longitude: '106.58935994522',
        // map_address: '重庆市南岸区和泓南山道',
        // name: '华泰中国城',
        // phone: '13996965974',
        // price: '864000.00',
        // // 是否被收藏过了  0没 1是
        // is_collect: 0
      }

    }
  },
  mounted () {
    this.query = this.$route.query
    // console.log(this.query)
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/Floor_List/getFloorDetails', {
        floor_id: this.query.floor_id,
        token: this.token
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.data = rs.data
          }
        })
    },
    onMap () {
      window.location.href = `http://api.map.baidu.com/marker?location=${this.data.latitude},${this.data.longitude}`
    },
    onCall () {
      console.log('打电话')
      window.href = `tel:${this.phone}`
    },
    onStar () {
      console.log(this.token)
      // 收藏
      this.WR.post('/User/userCollectFloor', {
        floor_id: this.query.floor_id,
        token: this.token
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.data.is_collect = !this.data.is_collect
            Toast(rs.message)
          }
        })
    },
    // 推荐该房
    linkToRecomment () {
      this.$router.push({
        name: 'Recomment',
        query: {
          floor_id: this.query.floor_id,
          floor_name: this.data.name
        }
      })
    }
  }
}
</script>
