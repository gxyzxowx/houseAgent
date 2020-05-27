<!--
 * @Date         : 2020-05-20 14:14:37
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 16:15:50
 * @FilePath     : \agent\src\views\Message.vue
 * @Description  : 首页 - 消息
-->
<style lang="scss" scoped>
.van-cell--large .van-cell__title {
    text-align: start;
    padding-left: .3rem;
}
</style>
<template>
  <div>
    <van-cell-group>
    <van-cell title="系统" :value="system_message.length==0?'' :system_message.create_time" size="large" :label="system_message.length==0?'暂无信息' :system_message.content" is-link @click="linkTo(1)">
        <template #icon>
          <van-icon name="chat" size=".8rem" color="rgb(35, 137, 255)"/>
        </template>
    </van-cell>
    <van-cell title="客户状态变更"  :value="customer_status_message.length==0?'' :customer_status_message.create_time" size="large" :label="customer_status_message.length==0?'暂无信息': customer_status_message.content" is-link @click="linkTo(2)">
      <template #icon>
          <van-icon name="umbrella-circle" size=".8rem" color="rgb(35, 137, 255)"/>
        </template>
    </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Icon } from 'vant'

Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      customer_status_message: [],
      system_message: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // console.log(123)
      this.WR.post('/User/getNewestMessage', {
        token: this.token
      })
        .then(rs => {
          // console.log(rs)
          if (rs.code === 0) {
            this.customer_status_message = rs.data.customer_status_message
            this.system_message = rs.data.system_message
            // console.log(rs.data.system_message.length)
          }
        })
    },
    linkTo (type) {
      this.$router.push({
        name: 'MessageList',
        query: { type: type }
      })
    }
  }
}
</script>
