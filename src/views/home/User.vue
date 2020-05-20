<!--
 * @Date         : 2020-05-19 11:36:55
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 11:44:34
 * @FilePath     : \agent\src\views\home\User.vue
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
    background: -webkit-gradient(linear, 100% 0%, 0% 100%, from(#027CF7), to(#0280FF), color-stop(.8,#59A7FF));
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
    .right{
      // @include squareBg(.32rem, #fff);
    }
  }
  .user{
    .setting{
      margin: .2rem;
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
        color: rgb(35, 137, 255);
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
        <van-icon class="setting" name="setting-o" color="#fff" size=".55rem"/>
      </div>
    </header>
    <main>
      <ul>
        <li class="cell">
          <div class="pic">
            <van-icon name="manager" class="cell" size=".8rem"/>
          </div>
          <div class="text">个人信息</div>
        </li>
        <li class="cell">
          <div class="pic">
            <van-icon name="friends" class="cell" size=".8rem"/>
          </div>
          <div class="text">我的客户</div>
        </li>
        <li class="cell">
          <div class="pic">
            <van-icon name="good-job"  class="cell" size=".8rem"/>
          </div>
          <div class="text">我的经纪人</div>
        </li>
        <li class="cell">
          <div class="pic">
            <van-icon name="add-square"  class="cell" size=".8rem"/>
          </div>
          <div class="text">我的邀请</div>
        </li>
        <li class="cell">
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

}
</script>
