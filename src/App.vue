<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 09:20:02
 * @FilePath     : \agent\src\App.vue
 * @Description  :  入口
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
   height:100vh;
  background: #f7f7f7;
  // font-size: .24rem;
}

</style>
<script>
export default {
  beforeCreate () {
    console.log('app before')
  }
}
</script>
