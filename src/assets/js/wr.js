/*
 * @Date         : 2020-04-30 10:41:48
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 11:20:31
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
        if (res.data.code === 2) {
          // 去登录
          alert(res.data.message)
          obj.getLinkWXUrl()
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
            obj.getLinkWXUrl()
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
    // alert('去请求getRedirectUrl')
    let url, customerId
    const local = window.location.href
    if (local.indexOf('customer_id') !== -1) {
      // 是案场助理详情页（扫码去的）
      url = '/assistant/detail'
      const hashname = window.location.hash
      const index0 = hashname.indexOf('=')
      customerId = hashname.slice(index0 + 1)
    } else {
      url = window.location.href
    }
    obj.post('/Login/getRedirectUrl', {
      url: url,
      customer_id: customerId
    }).then((rs) => {
      // alert(JSON.stringify(rs.data))
      if (rs.code === 0) {
        window.location.href = rs.data.redirect_url
      } else {
        alert(rs.message)
      }
    })
  }
}
export default obj
