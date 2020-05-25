<!--
 * @Date         : 2020-05-19 11:36:55
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 10:11:58
 * @FilePath     : \agent\src\views\home\User0.vue
 * @Description  : 我的页面
-->
<style lang="scss" scoped>
#app{
  background-color: #fff;
}
.user{
  height: 100%;
  background-color: #f7f7f7;
}
  header{
    height: 3.5rem;
   background:linear-gradient(90deg,rgba(2,124,247,1),rgba(97,164,251,1));
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      margin:.6rem;
      align-items: center;
      .pic{
        @include square(1.4rem);
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        img{
        @include square(100%);

        }
      }
      .name{
        @include font(.32rem, #fff);
      }
    }
  }
  .user{
    .setting{
      margin: .25rem;
    }
  }

  main{
    margin-top: .25rem;
  background: #fff;
    ul {
       display: flex;
      flex-wrap: wrap;
      align-items: center;
      li{
        display: flex;
        flex-direction: column;
        padding: .25rem 0;
        width: 24.9%;
        // height: 1.8rem;
      .cell{
        color: $c;
      }
    }
    }
  }
</style>
<template>
  <div class="user">
    <header>
      <div class="left">
        <div class="pic">
          <img src="" alt="">
        </div>
        <div class="name"> 注册/ 登录</div>
      </div>
      <div class="right">
        <van-icon class="setting" name="setting-o" color="#fff" size=".55rem" @click="linkToSetting"/>
      </div>
    </header>
    <main>
      <ul>
        <li class="cell" @click="linkTo(0)">
          <div class="pic">
            <van-icon name="manager" class="cell" size=".8rem"/>
          </div>
          <div class="text">个人信息</div>
        </li>
        <li class="cell" @click="linkTo(1)">
          <div class="pic">
            <van-icon name="friends" class="cell" size=".8rem"/>
          </div>
          <div class="text">我的客户</div>
        </li>
        <li class="cell" @click="linkTo(2)">
          <div class="pic">
            <van-icon name="good-job"  class="cell" size=".8rem"/>
          </div>
          <div class="text">我的经纪人</div>
        </li>
        <li class="cell" @click="linkTo(3)">
          <div class="pic">
            <van-icon name="add-square"  class="cell" size=".8rem"/>
          </div>
          <div class="text">我的邀请</div>
        </li>
        <li class="cell" @click="linkTo(4)">
          <div class="pic">
            <van-icon name="like"  class="cell" size=".8rem"/>
          </div>
          <div class="text">楼盘收藏</div>
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
  methods: {
    linkTo (type) {
      const pathName = [
        'UserInfo',
        'MyCustom',
        'SharePhoster',
        'MyInvite',
        'MyStar'
      ]
      this.$router.push({
        name: pathName[type]
      })
    },
    linkToSetting () {
      this.$router.push({
        name: 'Setting'
      })
    }

  }
}
</script>
