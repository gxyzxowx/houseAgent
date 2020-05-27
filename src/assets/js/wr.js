/*
 * @Date         : 2020-04-30 10:41:48
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 17:14:06
 * @FilePath     : \agent\src\assets\js\wr.js
 */
import axios from 'axios'
import QS from 'qs'
// const BASE_URL = 'http://fangchan.caimaomeng.com/index'
const BASE_URL = '/agent'
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
          if (res.code === 2) {
            // 去登录
            alert(res.message)
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
  }
}
export default obj
