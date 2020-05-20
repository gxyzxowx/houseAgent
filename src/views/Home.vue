<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 09:16:39
 * @FilePath     : \agent\src\views\Home.vue
 * @Description  : 首页(3个切换)
-->
<style lang="scss" scoped>
.home {
  footer {
    width: 100%;
    height: 0.98rem;
    position: fixed;
    bottom: 0;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1px solid rgba(238, 238, 238, 1);
    box-shadow:0px -5px 8px 0px rgba(0, 0, 0, 0.06);
    background-color: #fff;

    a {
      text-decoration: none;
      @include font(0.22rem, #666);
      display: flex;
      flex-direction: column;
      align-items: center;

      &.router-link-active {
        color: #027cf7;
        &:nth-of-type(1) .pic {
          background-image: url("../assets/img/home11.png");
        }
        &:nth-of-type(3) .pic {
          background-image: url("../assets/img/user31.png");
        }

      }
      .text {
      }
      .pic {
        @include squareBg(0.42rem, "../assets/img/home10.png");
      }
      &:nth-of-type(3) .pic {
        background-image: url("../assets/img/user30.png");
      }
      &:nth-of-type(2) .tui {
        @include rectBg(.88rem, 1.08rem, '../assets/img/addbg.png');
        display: flex;
        flex-direction: column;
        padding: .15rem 0;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        .pic{
          @include squareBg(.36rem, '../assets/img/add.png');
        }
      }
    }
  }
}
</style>
<template>
  <div class="home">

    <router-view />
    <footer>
      <router-link to="/home/hot">
        <div class="pic"></div>
        <div class="text">首页</div>
      </router-link>
      <router-link class="tui" to="/home/recomment" >
        <div class="tui">
          <div class="pic"></div>
          <div class="text">推荐</div>
        </div>

      </router-link>
      <router-link to="/home/user">
        <div class="pic"></div>
        <div class="text">我的</div>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$router.push('/home/hot')
  }
}
</script>
