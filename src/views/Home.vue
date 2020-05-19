<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-19 10:53:52
 * @FilePath     : \agent\src\views\Home.vue
 * @Description  : 首页(3个切换)
-->
<style lang="scss">
.home{
  footer{
    width: 100%;
    height: .98rem;
    padding: 0 .1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
      .text{
        font-size: .22rem;
      }
    }
  }
}
</style>
<template>
  <div class="home">
    首页
    <router-view />
    <footer>
      <router-link to="/home/name">
        <div class="pic"></div>
        <div class="text">首页</div>
      </router-link>
      <router-link to="/home/recomment">
        <div class="pic"></div>
        <div class="text">推荐</div>
      </router-link>
      <router-link to="/home/user">
        <div class="pic"></div>
        <div class="text">我的</div>
      </router-link>
    </footer>
  </div>
</template>

<script>
</script>
