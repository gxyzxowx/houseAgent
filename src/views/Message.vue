<!--
 * @Date         : 2020-05-20 14:14:37
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 14:43:19
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
    <van-cell title="系统" value="2020-05-20 15:30:25" size="large" label="用户注册" is-link @click="linkTo(0)">
        <template #icon>
          <van-icon name="chat" size=".8rem" color="rgb(35, 137, 255)"/>
        </template>
    </van-cell>
    <van-cell title="客户状态变更" value="" size="large" label="暂无消息" is-link @click="linkTo(1)">
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

    }
  },
  methods: {
    linkTo (type) {
      this.$router.push({
        name: 'MessageList',
        query: { type: type }
      })
    }
  }
}
</script>
