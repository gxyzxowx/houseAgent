<!--
 * @Date         : 2020-05-19 11:36:34
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-20 11:57:38
 * @FilePath     : \agent\src\views\home\Recomment.vue
 * @Description  : 推荐客户
-->
<style lang="scss" scoped>
.recomment{
  height: 100%;
  background-color: #F7F7F7;
}

  .bottom{
    margin-top: .2rem;
    .title{
      background-color: #fff;
      @include rect(100%, .88rem);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .24rem;
      box-sizing: border-box;
      .text{
        @include font(.32rem, #333);
      }
      .add{
        @include squareBg(.32rem, '../../assets/img/addrecomment.png');
      }
    }
    ul.body{
      li.body-cell{
        @include rect(100%, .97rem);
      padding:  0 .24rem;
      box-sizing: border-box;
        display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFF2E7;
        .name{
          @include font(.26rem, #666);
          }
          .delete{
            @include squareBg(.24rem, '../../assets/img/dele.png');
          }
      }
    }
  }

</style>
<style lang="scss">
    .wr-button{
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
  }
    .recomment{
    .van-field__label {
    width: 112px;
    text-align: start;
}
  }
</style>
<template>
  <div class="recomment">
    <div class="top">
    <van-cell-group>
  <van-field v-model="send.name" required placeholder="请输入用户名" label=
  "姓名"
    right-icon="smile-o"/>

 <!-- 性别： -->
 <van-field name="radio" label="性别" required>
  <template #input>
    <van-radio-group v-model="send.sex" direction="horizontal">
      <van-radio name="1">男</van-radio>
      <van-radio name="2">女</van-radio>
    </van-radio-group>
  </template>
</van-field>

  <van-field v-model="send.phone" required type="tel" label="手机号" />

   <van-field v-model="send.time"  placeholder="请输入预计到访时间" label=
  " 预计到访时间"/>
</van-cell-group>
    </div>
<div class="bottom">
  <div class="title">
    <div class="text">意向楼盘</div>
    <div class="add" @click="addHouse"></div>
  </div>
  <ul class="body">
    <li class="body-cell">
      <div class="name">观音桥商贸中心</div>
      <div class="delete"></div>
    </li>
  </ul>
</div>

<van-button type="info" class="wr-button">报备</van-button>
  </div>
</template>
<script>
import Vue from 'vue'
import { Field, CellGroup, RadioGroup, Radio, Button } from 'vant'

Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(CellGroup)
export default {
  data () {
    return {
      send: {
        name: '',
        phone: '',
        sex: '1',
        time: ''
      }
    }
  },
  methods: {
    addHouse () {
      this.$router.push({ name: 'RecommentAdd' })
    }
  }
}
</script>
