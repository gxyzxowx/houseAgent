<!--
 * @Date         : 2020-05-20 14:54:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-27 15:59:53
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
.search{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  form{
    flex: 1;
  }
  .icon{
    font-size: .9rem;
    color: #999;
    margin: 0 .25rem;
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
      <van-icon name="invition" class="icon" @click="linkToStarList()"/>
    </div>
    <div class="select-bar">
      <van-dropdown-menu>
        <!-- 1全部项目 -->
        <van-dropdown-item title="选择项目" ref="item1">
          <van-search v-model="searchItemValue" placeholder="请输入项目名称" @search="onSearchItem" />
          <van-cell value="所有项目" @click="change1(undefined)">
            <!-- <template #right-icon>
              <van-icon name="success" color="red" style="line-height: inherit;" size=".4rem" />
            </template> -->
          </van-cell>
          <van-cell v-for="item in option1" :key="item.id" :value="item.name" @click="change1(item.id, item.name)" />
        </van-dropdown-item>
        <!-- 2选择日期 -->
        <van-dropdown-item title="选择日期">
          <van-cell title="选择日期区间" :value="date" @click="calendarShow = true" />
          <van-calendar v-model="calendarShow" type="range" @confirm="change2"  :min-date="minDate"/>
        </van-dropdown-item>
        <!-- 3客户状态（两大类） -->
        <van-dropdown-item title="客户状态" ref="item3">
          <div class="status">
            <div class="title">业务状态</div>
            <ul class="list">
              <li v-for="(item, index) in config.business_status_array" :key="index" :class="{active: index==currentIndex30}" @click="change3(index, 0,item.id)">{{item.name}}</li>
            </ul>
            <div class="title">报备状态</div>
            <ul class="list">
              <li v-for="(item, index) in config.report_status_array" :key="index"  :class="{active: index==currentIndex31}" @click="change3(index, 1, item.id)">{{item.name}}</li>
            </ul>
          </div>
        </van-dropdown-item>
        <!-- 4状态更新 -->
        <van-dropdown-item title="状态更新" v-model="value4" :options="option4" @change="change4" />
      </van-dropdown-menu>
    </div>
    <main>
      <ul class="customlist">
              <van-list
  v-model="loading"
  :finished="finished"
  offset= 10
  finished-text="没有更多了"
  @load="getData"
>
        <li v-for="(item, index) in list" :key="item.customer_id" @click="openCustomDetail(item.customer_id)">
          <div class="top">
            <div class="left">
              <div class="title">
                <span class="username">{{item.customer_name}}</span>
                <span class="phone">{{item.phone}}</span>
                <span class="status">{{item.report_status_name}}</span>
              </div>
              <div class="house">{{item.floor_name}}</div>
            </div>
            <div class="right">{{item.business_status_name}}</div>
          </div>
          <div class="com-line"></div>
          <div class="bottom">
            <div class="left"><span>状态更新时间:</span><span>{{item.update_time}}</span></div>
            <div class="right">
              <van-icon :class="{red: item.is_concern}" name="like" size=".4rem" @click.stop ="starCustom(index, item.customer_id)" class="like"/>
              <van-icon name="edit"  size=".4rem" @click.stop ="recommentIt(item.customer_id)"/>
            </div>
          </div>
        </li>
        </van-list>
      </ul>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, DropdownMenu, DropdownItem, Cell, Icon, Calendar, Toast, List } from 'vant'

Vue.use(Toast)
Vue.use(Calendar)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Search)
Vue.use(List)
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('token'),
      page: 0,
      loading: false,
      finished: false,
      // 头部搜索
      value: '',
      option1: [],
      value1: undefined,
      // 搜索项目
      searchItemValue: '',
      // 开始时间，结束时间
      value2b: undefined,
      value2e: undefined,
      minDate: new Date(2010, 0, 1),
      // 状态更新的值
      value4: undefined,
      option4: [
        { text: '状态更新时间降序', value: 3 },
        { text: '状态更新时间升序', value: 4 },
        { text: '最新报备时间降序', value: 1 },
        { text: '最新报备时间升序', value: 2 }
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
      currentIndex31: -1,
      // 业务状态值
      value3b: undefined,
      // 报备状态值
      value3r: undefined,
      config: {
        // 业务状态：已经报备/已到访/已认购/已签约等
        business_status_array: [],
        // 报备状态：待确认，已确认，过期无效
        report_status_array: []
      }
    }
  },
  mounted () {
    this.getData()
    this.getCustomerStatusConfigData()
  },
  methods: {
    getData () {
      this.page++
      console.log(this.token)
      console.log(this.value2b, this.value2e)
      this.WR.post('/User/getUserCustomerList', {
        token: this.token,
        page: this.page,
        business_status: this.value3b,
        report_status: this.value3r,
        type: this.value4,
        floor_id: this.value1,
        start_time: this.value2b,
        end_time: this.value2e,
        keywords: this.value,
        row: 10
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            const data = rs.data.data_list
            data.map((item, index) => {
              // 时间转换
              data[index].update_time = this.getformatDate(data[index].update_time)
            })
            this.list = this.list.concat(data)
            this.loading = false
            if (rs.data.total <= this.list.length) {
              this.finished = true
            }
            // console.log(data)
          }
        })
    },
    // 头部的搜索
    onSearch (value) {
      console.log(value)
      this.page = 0
      this.list = []
      this.getData()
    },
    onCancel () {},
    // 搜索项目
    onSearchItem (val) {
      this.WR.post('/Floor_List/searchFloorList', {
        keywords: val
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          this.option1 = rs.data
        }
      })
    },
    // 1选择项目
    change1 (id) {
      console.log(id)
      this.$refs.item1.toggle()
      this.page = 0
      this.list = []
      this.value1 = id
      this.getData()
    },
    // 3客户状态
    change3 (item, type, id) {
      console.log(item, type)
      this.currentIndex30 = -1
      this.currentIndex31 = -1
      const str = 'currentIndex3' + type
      this[str] = item
      this.$refs.item3.toggle()

      this.page = 0
      this.list = []
      if (type === 0) {
        // 业务状态变更
        this.value3b = id
      } else {
        // 报备状态变更
        this.value3r = id
      }
      this.getData()
    },
    // 4状态更新
    change4 (type) {
      console.log(type)
      this.page = 0
      this.list = []
      this.value4 = type
      this.getData()
    },
    formatDate (date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    change2 (date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
      console.log(date)
      this.calendarShow = false

      this.page = 0
      this.list = []
      this.value2b = start
      this.value2e = end
      this.getData()
    },
    // 点击编辑跳转到推荐客户
    recommentIt (id) {
      this.$router.push({
        name: 'Recomment',
        query: { customer_id: id }
      })
    },
    // 点击打开客户详情
    openCustomDetail (id) {
      this.$router.push({
        name: 'CustomDetail',
        query: {
          customer_id: id
        }
      })
    },
    // 收藏客户
    starCustom (index, id) {
      this.WR.post('/User/userConcernCustomer', {
        token: this.token,
        customer_id: id
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.list[index].is_concern = !this.list[index].is_concern
            console.log(this.list[index].is_concern)
            Toast('收藏成功！')
          } else {
            Toast(rs.message)
          }
        })
    },
    // 得到时间
    getformatDate (timestamp) {
      var add0 = function (data) {
        if (String(data).length === 1) {
          return `0${data}`
        } else {
          return data
        }
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      timestamp = timestamp * 1000
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds)
    },
    // 得到配置项
    getCustomerStatusConfigData () {
      this.WR.post('/User/getCustomerStatusConfigData', {
        token: this.token
      })
        .then(rs => {
          // console.log(rs)
          if (rs.code === 0) {
            this.config = rs.data
          }
        })
    },
    // 跳转到关注列表
    linkToStarList () {
      this.$router.push({ name: 'MyCustomStar' })
    }
  }
}
</script>
