<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 09:53:42
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
  created () {
    // this.getCode()
    // 测试
    const token = 'f083KKPVBLrTVhFfuA2l+m/TGhPJLr6vxz6eL+XR'
    window.sessionStorage.setItem('token', token)
    // 测试完毕
  },
  methods: {
    getCode () { // 非静默授权，第一次有弹框
      this.code = ''
      var local = window.location.href // 获取页面url
      // var appid = 'wx4c36d423f21966fc'
      this.code = this.getUrlCode().code // 截取code
      if (!this.code) { // 如果没有code，则去请求
        // 获取跳转url
        this.getLinkWXUrl(local)
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      } else {
        // 你自己的业务逻辑
        alert(`这是code: ${this.code}`)
        // 有code, 去登录
        this.getToken()
      }
    },
    getLinkWXUrl (local) {
      // console.log(local)
      this.WR.post('/Login/getRedirectUrl', {
        url: local
      }, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          window.location.href = rs.data.redirect_url
        }
      })
    },
    getUrlCode () { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = { }
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      }
      return theRequest
    },
    getToken () {
      this.WR.post('/Login/getCode', {
        code: this.code,
        master_uid: ''
      }, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          const token = rs.data.token
          window.sessionStorage.setItem('token', token)
        }
      })
    }
  }
}
</script>
