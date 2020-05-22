<!--
 * @Date         : 2020-05-20 14:54:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 15:13:58
 * @FilePath     : \agent\src\views\MyCustom.vue
 * @Description  : 我的客户
-->
<style lang="scss" scoped>
@import '~@/assets/scss/customlist.scss';
.select-bar{
  .status{
    padding: .24rem 0 .24rem .24rem;
    .title{
      font-size: .3rem;
      text-align: start;
    }
    ul.list{
      display: flex;
      flex-wrap: wrap;
      margin: .2rem 0;
      li{
        padding: .08rem .25rem;
        border-radius: .1rem;
        border: 1px solid #ddd;
        margin-right: .25rem;
        margin-bottom: .2rem;
        font-size: .28rem;
        &.active{
          border-color: $c;
          color: $c;
        }
      }
    }
  }
}

</style>

<template>
  <div>
    <div class="search">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入电话号码后4位或姓名"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="select-bar">
      <van-dropdown-menu>
        <!-- 1全部项目 -->
        <van-dropdown-item title="选择项目">
          <van-search v-model="searchItemValue" placeholder="请输入项目名称" @search="onSearchItem" />
          <van-cell value="所有项目">
            <template #right-icon>
              <van-icon name="success" color="red" style="line-height: inherit;" size=".4rem" />
            </template>
          </van-cell>
        </van-dropdown-item>
        <!-- 2选择日期 -->
        <van-dropdown-item title="选择日期">
          <van-cell title="选择日期区间" :value="date" @click="calendarShow = true" />
          <van-calendar v-model="calendarShow" type="range" @confirm="onConfirm" />
        </van-dropdown-item>
        <!-- 3客户状态（两大类） -->
        <van-dropdown-item title="客户状态" ref="item3">
          <div class="status">
            <div class="title">业务状态</div>
            <ul class="list">
              <li v-for="(item, index) in custom.yewu" :key="index" :class="{active: index==currentIndex30}" @click="change3(index, 0)">{{item}}</li>
            </ul>
            <div class="title">报备状态</div>
            <ul class="list">
              <li v-for="(item, index) in custom.baobei" :key="index"  :class="{active: index==currentIndex31}" @click="change3(index, 1)">{{item}}</li>
            </ul>
          </div>
        </van-dropdown-item>
        <!-- 4状态更新 -->
        <van-dropdown-item title="状态更新" v-model="value4" :options="option4" @change="change4" />
      </van-dropdown-menu>
    </div>
    <main>
      <ul class="customlist">
        <li @click="openCustomDetail()">
          <div class="top">
            <div class="left">
              <div class="title">
                <span class="username">曾小迪</span>
                <span class="phone">13752565231</span>
                <span class="status">待确认</span>
              </div>
              <div class="house">观音桥中心城</div>
            </div>
            <div class="right">报备</div>
          </div>
          <div class="com-line"></div>
          <div class="bottom">
            <div class="left"><span>状态更新时间:</span><span>2020-05-20 12:11:52</span></div>
            <div class="right">
              <van-icon name="like" size=".4rem"/>
              <van-icon name="edit"  size=".4rem" @click = "recommentIt()"/>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, DropdownMenu, DropdownItem, Cell, Icon, Calendar } from 'vant'

Vue.use(Calendar)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Search)
export default {
  data () {
    return {
      // 头部搜索
      value: '',
      // 搜索项目
      searchItemValue: '',
      // 状态更新的值
      value4: 0,
      option4: [
        { text: '状态更新时间降序', value: 1 },
        { text: '状态更新时间升序', value: 2 },
        { text: '最新报备时间降序', value: 3 },
        { text: '最新报备时间升序', value: 4 }
      ],
      date: '',
      calendarShow: false,
      // 客户状态文字选择的文字列表
      custom: {
        yewu: ['报备', '到访', '认筹', '认购', '签约'],
        baobei: ['有效', '待确认', '拒收无效', '手工无效', '过期无效']
      },
      // 客户状态index
      currentIndex30: -1,
      currentIndex31: -1
    }
  },
  methods: {
    // 头部的搜索
    onSearch (value) {
      console.log(value)
    },
    onCancel () {},
    // 搜索项目
    onSearchItem (val) {},
    // 3客户状态
    change3 (item, type) {
      console.log(item, type)
      this.currentIndex30 = -1
      this.currentIndex31 = -1
      const str = 'currentIndex3' + type
      this[str] = item
      this.$refs.item3.toggle()
    },
    // 4状态更新
    change4 (val) {
      console.log(val)
    },
    formatDate (date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm (date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
      console.log(this.date)
      this.calendarShow = false
    },
    // 点击编辑跳转到推荐客户
    recommentIt () {
      this.$router.push({
        name: 'Recomment',
        query: 'abc'
      })
    },
    // 点击打开客户详情
    openCustomDetail () {
      this.$router.push({
        name: 'CustomDetail',
        query: 'abc'
      })
    }
  }
}
</script>
