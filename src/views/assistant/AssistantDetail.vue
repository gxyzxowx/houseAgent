<!--
 * @Date         : 2020-05-22 11:44:41
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 14:43:49
 * @FilePath     : \agent\src\views\assistant\AssistantDetail.vue
 * @Description  : 案场助理详情页
-->
<style lang="scss" scoped>
  main{
    text-align: start;
    .main-title{
    text-align: start;
    font-size: .36rem;
    padding:.18rem .24rem;
    background: #fff;
    font-weight: 700;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #f7f7f7;
  }
  .user-content, .agent-content{
    background: #fff;
    padding: .24rem;
    .top{
      display: flex;
      img{
        @include square(1.2rem);
        border-radius: 50%;
        margin-right: .5rem;
      }
      .info{
        @include font(.32rem, #333);
        line-height: .5rem;
      }
    }
    .bottom{
      display: flex;
      align-items: center;
      margin-top: .25rem;
      @include font(.26rem, #666);
    }
  }
  .status{
    margin-top: .25rem;
    display: flex;
    .main-title{
      background: #fff;
      border:none;
    }
    .select{
      flex: 1;
    }
  }
}
footer{
  position: fixed;
  left: 0;
  bottom: 2rem;
  width: 100%;
}
.footer-btn{
  margin: 0 auto;
  width: 2.5rem;
}
</style>
<template>
  <div>
    <main>
      <!-- 客户信息 -->
      <div class="main-title">客户信息</div>
      <div class="user-content">
        <div class="top">
          <img src="../../assets/img/home11.png" alt />
          <div class="info">
            <div class="username">曾小迪</div>
            <div class="phone">13758562331</div>
          </div>
        </div>
        <div class="bottom">
          <div class="time-text">预计到访时间： </div>
          <div class="time">2020-05-05 12:20:20</div>
        </div>
      </div>
      <!-- 经纪人信息 -->
      <div class="main-title">经纪人信息</div>
      <div class="agent-content">
        <div class="top">
          <img src="../../assets/img/home11.png" alt />
          <div class="info">
            <div class="username">杨经理</div>
            <div class="phone">13758562331</div>
          </div>
        </div>
      </div>

      <!-- 客户状态 -->
      <div class="status">
        <div class="main-title" >客户状态：</div>
        <div class="select">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
      </div>
    </main>

    <footer><van-button type="info" size="large" class="footer-btn">保存</van-button></footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem, Button } from 'vant'

Vue.use(Button)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
export default {
  data () {
    return {
      value1: 0,
      option1: [
        { text: '到访', value: 0 },
        { text: '认筹', value: 1 },
        { text: '认购', value: 2 },
        { text: '签约', value: 3 }
      ]
    }
  }
}
</script>
