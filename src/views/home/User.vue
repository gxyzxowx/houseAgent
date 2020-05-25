<!--
 * @Date         : 2020-05-19 11:36:55
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 11:21:42
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
    @include rectBg(100%, 3.5rem, '../../assets/img/ubanner.png');
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      margin:.57rem;
      align-items: center;
      .pic{
        @include square(1.41rem);
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        img{
        @include square(100%);

        }
      }
      .name{
        @include font(.34rem, #fff);
      }
    }
  }
  .user{
    .setting{
      @include rectBg(.32rem, .36rem, '../../assets/img/setting.png');
      margin: .32rem;
    }
  }

  main{
    margin: .25rem .3rem;
    ul {
      li.cell{
        background: #fff;
        @include rect(100%, 1.3rem);
        border-radius: .1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;
        .left{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .pic{
            @include squareBg(.82rem, '../../assets/img/u1.png');
            margin: 0 .25rem;
          }
          .text{
            @include font(.3rem, #333);
          }
        }
        .right{
          margin-right: .25rem;
          @include rectBg(.16rem, .3rem, '../../assets/img/right.png');
        }
        &:nth-of-type(2) .pic{
          @include squareBg(.82rem, '../../assets/img/u2.png');
        }
        &:nth-of-type(3) .pic{
          @include squareBg(.82rem, '../../assets/img/u3.png');
        }
        &:nth-of-type(4) .pic{
          @include squareBg(.82rem, '../../assets/img/u4.png');
        }
        &:nth-of-type(5) .pic{
          @include squareBg(.82rem, '../../assets/img/u5.png');
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
        <div class="setting" @click="linkToSetting"></div>
      </div>
    </header>
    <main>
      <ul>
        <li class="cell" @click="linkTo(0)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">个人信息</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(1)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的客户</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(2)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的经纪人</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(3)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">我的邀请</div>
          </div>
          <div class="right"></div>
        </li>
        <li class="cell" @click="linkTo(4)">
          <div class="left">
            <div class="pic"></div>
            <div class="text">楼盘收藏</div>
          </div>
          <div class="right"></div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
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
