/*
 * @Date         : 2020-04-30 10:41:48
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 15:19:05
 * @FilePath     : \agent\src\assets\js\wr.js
 */
import axios from 'axios'
import QS from 'qs'
// const BASE_URL = 'http://fangchan.caimaomeng.com/index'
const BASE_URL = '/index'
const obj = {
  // 封装axios
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + url, {
        params: params
      }).then(res => {
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
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err.data)
        })
    })
  }
}
export default obj
