<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-19 10:40:41
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
  color: #2c3e50;
  font-size: .16rem;
}
html,body{
  // height: 100%;
  background: #fff;
  overflow-y: scroll;
}
</style>
