<!--
 * @Date         : 2020-05-22 09:36:30
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 15:55:27
 * @FilePath     : \agent\src\views\MyStar.vue
 * @Description  : 我的收藏 楼盘收藏
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
            <van-list
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getData"
>
      <li @click="linkToDetail(item.floor_id)" v-for="item in dataList" :key="item.floor_id">
        <div class="pic" :style="{backgroundImage: 'url(' + item.img + ')',backgroundSize: 'cover'}">
          <div class="bar">
            <div class="house-name">{{item.name}}</div>
            <div class="star active">
              <van-icon name="like" />
            </div>
          </div>
          </div>
        <div class="content">
          <div class="left">
            <div class="address">
              <div class="icon"><van-icon name="location-o" /></div>
              <span>{{item.map_address}}</span>
            </div>
            <div class="yong">
              <div class="icon">佣</div>
              <span>优质楼盘，佣金{{item.commission}}</span>
            </div>
          </div>
          <div class="right">推荐客户</div>
        </div>
      </li>
       </van-list>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon, List } from 'vant'

Vue.use(List)
Vue.use(Icon)
export default {
  data () {
    return {
      images: [
        'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ],
      token: window.sessionStorage.getItem('token'),
      loading: false,
      finished: false,
      page: 0,
      dataList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    linkToDetail (id) {
      this.$router.push({
        name: 'HouseDetail',
        query: {
          floor_id: id
        }
      })
    },
    getData () {
      this.page++
      console.log(this.page)
      this.WR.post('/User/getUserCollectList', {
        page: this.page,
        row: 5,
        token: this.token
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.dataList = this.dataList.concat(rs.data.data_list)
            this.loading = false
            if (rs.data.total <= this.dataList.length) {
              this.finished = true
            }
          }
        })
    }
  }
}
</script>
