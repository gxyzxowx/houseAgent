/*
 * @Date         : 2020-04-30 10:41:48
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 17:41:25
 * @FilePath     : \agent\src\assets\js\wr.js
 */
import axios from 'axios'
import QS from 'qs'
const BASE_URL = 'http://fangchan.caimaomeng.com/agent'
// const BASE_URL = '/agent'
const obj = {
  // 封装axios
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + url, {
        params: params
      }).then(res => {
        if (res.code === 2) {
          // 去登录
          alert(res.message)
          return
        }
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(BASE_URL + url, QS.stringify(params))
        .then(res => {
          if (res.data.code === 2) {
            // 去登录
            alert(res.data.message)
            this.getLinkWXUrl()
            return
          }
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err.data)
        })
    })
  },
  // 验证手机号码是否正确
  isMobile (mobile) {
    var patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (!patrn.exec(mobile)) { return false }
    return true
  },
  getLinkWXUrl () {
    let url, customerId
    if (this.$route.name === 'AssistantDetail') {
      // 是案场助理详情页（扫码去的）
      url = '/assistant/detail'
      const hashname = window.location.hash
      const index0 = hashname.indexOf('=')
      customerId = hashname.slice(index0 + 1)
    } else {
      url = window.location.href
    }
    alert(this.$route.name)
    alert('url：' + url)
    alert('customer_id：' + customerId)
    this.WR.post('/Login/getRedirectUrl', {
      url: url,
      customer_id: customerId

    }, this).then((rs) => {
      // alert(JSON.stringify(rs.data.redirect_url))
      if (rs.code === 0) {
        window.location.href = rs.data.redirect_url
      }
    })
  }
}
export default obj
