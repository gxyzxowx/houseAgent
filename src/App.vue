<!--
 * @Date         : 2020-05-19 10:23:53
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 17:48:27
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
   margin: 0;
   padding: 0;
  background: #f7f7f7;
  // font-size: .24rem;
}

</style>
<script>
export default {
  data () {
    return {
      code: '',
      master_uid: ''
    }
  },
  created () {
    this.getCode()
    // 测试
    // const token = 'ed2024TtGulriZ+IQrePpBy/sl/sJELGLFFPntrIWA'
    // window.sessionStorage.setItem('token', token)
    // this.$router.push({ name: 'Hot' })
    // 测试完毕
  },
  methods: {
    getCode () { // 非静默授权，第一次有弹框
      this.code = ''
      this.code = this.getUrlCode().code // 截取code
      this.master_uid = this.getMasterUid() // 截取master_uid
      if (!this.code) { // 如果没有code，则去请求
        // 获取跳转url
        this.WR.getLinkWXUrl()
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      } else {
        // 你自己的业务逻辑
        // 有code, 去登录
        this.getToken()
      }
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
        master_uid: this.master_uid || ''
      }, this).then((rs) => {
        if (rs.code === 0) {
          const token = rs.data.token
          window.sessionStorage.setItem('token', token)
          if (window.location.href.indexOf('customer_id') !== -1) {
            const index0 = window.location.hash.indexOf('=')
            const customerId = window.location.hash.slice(index0 + 1)
            this.$router.push({
              name: 'AssistantDetail',
              query: {
                customer_id: customerId
              }
            })
          } else {
            this.$router.push({ name: 'Hot' })
          }
        }
      })
    },
    getMasterUid () {
      const hashname = window.location.hash
      if (window.location.href.indexOf('master_uid') !== -1) {
        const index0 = hashname.indexOf('=')
        const lastV = hashname.slice(index0 + 1)

        return lastV
      } else {
        return ''
      }

      // console.log(lastV)
    }
  }
}
</script>
