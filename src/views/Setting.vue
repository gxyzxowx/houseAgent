<!--
 * @Date         : 2020-05-21 14:20:14
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-21 15:02:30
 * @FilePath     : \agent\src\views\Setting.vue
 * @Description  : 我的 -- 设置
-->
<style lang="scss" scoped>
.van-cell__title {
  text-align: start;
  text-indent: 0.1rem;
}
.exit{
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <van-cell-group>
      <van-cell title="更改手机号码" :value="phone" is-link @click="show =!show"/>
    </van-cell-group>

      <!-- 填写手机号 -->
    <van-dialog v-model="show" title="更改手机号" show-cancel-button @confirm="changePhone">
      <div class="editname">
        <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号"/>
      </div>
    </van-dialog>

    <van-button type="danger" class="exit">退出登录</van-button>
  </div>

</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Field, Dialog, Button } from 'vant'

Vue.use(Button)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      phone: '',
      show: false
    }
  },
  methods: {
    changePhone () {
      // 更改的手机号发送给后端
    }
  }
}
</script>
