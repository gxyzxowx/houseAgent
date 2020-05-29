<!--
 * @Date         : 2020-05-19 11:36:34
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 14:36:26
 * @FilePath     : \agent\src\views\home\Recomment.vue
 * @Description  : 推荐客户
-->
<style lang="scss" scoped>
.recomment {
  height: 100%;
  background-color: #f7f7f7;
}

.bottom {
  margin-top: 0.2rem;
  .title {
    background-color: #fff;
    @include rect(100%, 0.88rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.24rem;
    box-sizing: border-box;
    .text {
      @include font(0.32rem, #333);
    }
    .add {
      @include squareBg(0.32rem, "../../assets/img/addrecomment.png");
    }
  }
  ul.body {
    li.body-cell {
      @include rect(100%, 0.97rem);
      padding: 0 0.24rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff2e7;
      .name {
        @include font(0.26rem, #666);
      }
      .delete {
        @include squareBg(0.24rem, "../../assets/img/dele.png");
      }
    }
  }
}
.recoment-add {
  height: 8rem;
  main {
    .title {
      @include font(0.3rem, #333);
      text-align: start;
      padding: 0.1rem 0.24rem;
    }
  }
}
</style>
<style lang="scss">
.wr-button {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
}
.recomment {
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
        <van-field
          v-model="send.name"
          required
          placeholder="请输入用户名"
          label="姓名"
          right-icon="smile-o"
          @focus="showBtn=false"
          @blur="showBtn=true"
        />

        <!-- 性别： -->
        <van-field name="radio" label="性别" required>
          <template #input>
            <van-radio-group v-model="send.sex" direction="horizontal">
              <van-radio name="1">女</van-radio>
              <van-radio name="2">男</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field v-model="send.phone" required type="tel" label="手机号" @focus="showBtn=false" @blur="showBtn=true"/>

        <van-field
          v-model="timeDisplay"
          placeholder="请选择预计到访时间"
          label=" 预计到访时间"
          @click.stop="showTime = !showTime,showBtn=false"
          :readonly ='true'
        />
      </van-cell-group>
    </div>
    <van-datetime-picker
      v-show="showTime"
      v-model="currentDate"
      type="datetime"
      title="精确到小时"
      @confirm="selectTime"
      @cancel="showTime = false,showBtn=true"
    />
    <div class="bottom">
      <div class="title">
        <div class="text">意向楼盘</div>
        <div class="add" @click="addHouse"></div>
      </div>
      <ul class="body">
        <li class="body-cell" v-for="(item,index) in addList" :key="item.id">
          <div class="name">{{item.name}}</div>
          <div class="delete" @click="deleteAdd(index)"></div>
        </li>
      </ul>
    </div>

    <van-button type="info" class="wr-button" v-if="customer_id" @click="modifyCustom()" v-show="showBtn">确认修改</van-button>
    <van-button type="info" class="wr-button" v-else @click="sendData()"  v-show="showBtn">报备</van-button>
    <van-dialog v-model="showAdd" title="新增意向楼盘" show-cancel-button :showConfirmButton="false">
      <div class="recoment-add">
        <div class="search">
          <form action="/">
            <van-search
              v-model="value"
              show-action
              placeholder="请输入楼盘名称"
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
        </div>
        <main>
          <div class="title">重庆市</div>
          <ul class="list">
            <li>
              <van-cell-group>
                <van-cell
                  v-for="item in list"
                  :key="item.id"
                  :value="item.name"
                  @click="choseItem(item.id, item.name)"
                />
              </van-cell-group>
            </li>
          </ul>
        </main>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Field,
  Cell,
  CellGroup,
  Search,
  RadioGroup,
  Radio,
  Button,
  DatetimePicker,
  Dialog
} from 'vant'

Vue.use(Cell)
Vue.use(Search)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(CellGroup)
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      send: {
        name: '',
        phone: '',
        sex: '1',
        time: '',
        floor_id: ''
      },
      showTime: false,
      timeDisplay: '',
      currentDate: new Date(),
      // 新增意向楼盘参数：
      showAdd: false,
      value: '',
      // 弹框搜索列表
      list: [],
      // 主页显示意向楼盘列表
      addList: [],
      // 修改客户信息参数
      customer_id: undefined,
      // 显示按钮
      showBtn: true
    }
  },
  created () {
    const query = this.$route.query

    if (query && query.customer_id) {
    // 是修改客户信息
      this.customer_id = query.customer_id
      this.getCustomInfo()
    } else if (query && query.floor_id) {
      console.log('推荐')
      // 是推荐楼盘
      this.addList.push({
        name: query.floor_name,
        id: query.floor_id
      })
    }
  },
  methods: {
    addHouse () {
      this.showAdd = true
      this.onSearch()
    },
    selectTime (val, yo) {
      // console.log(typeof val)
      this.showTime = false
      this.showBtn = true
      const lastV = this.dateFormat(val)
      this.timeDisplay = lastV
      console.log(lastV)
    },
    dateFormat (data) {
      // console.log(typeof data)
      const d = new Date(data)
      // console.log(d)
      // console.log(typeof d)
      const times = d.getTime()

      this.send.time = times
      const val =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' ' +
        d.getHours() +
        '点'
      return val
    },
    // 报备
    sendData () {
      const data = this.send
      if (!data.name) {
        Dialog({ message: '请输入带访客户姓名！' })
      }
      if (!this.WR.isMobile(data.phone)) {
        Dialog({ message: '请输入正确的手机号码！' })
        return
      }
      console.log(this.send)
      console.log(this.token)
      // 楼盘取第一个
      data.floor_id = this.addList[0] ? this.addList[0].id : undefined
      this.WR.post('/User/userAddCustomer', {
        customer_name: data.name,
        sex: data.sex,
        customer_mobile: data.phone,
        floor_id: data.floor_id,
        visiting_time: data.time / 1000,
        token: this.token
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          Dialog.alert({
            message: '报备成功'
          }).then(() => {
            window.history.go(-1)
          })
        } else {
          Dialog({ message: rs.message })
        }
      })
    },
    onSearch (val) {
      console.log('你点击了搜索:' + val)
      this.WR.post('/Floor_List/searchFloorList', {
        keywords: val || ''
      }).then(rs => {
        // console.log(rs)
        if (rs.code === 0) {
          this.list = rs.data
        }
      })
    },
    onCancel () {
      console.log('你点击了取消')
    },
    choseItem (id, name) {
      this.showAdd = false
      this.send.floor_id = id
      for (let i = 0; i < this.addList.length; i++) {
        if (this.addList[i].id === id) { return }
      }
      this.addList.push({
        id: id,
        name: name
      })
      // this.$router.push({ name: 'Recomment', query: this.query })
    },
    deleteAdd (index) {
      // 删除意向楼盘
      this.addList.splice(index, 1)
    },
    // 得到客户信息 -- 是修改客户信息页面
    getCustomInfo () {
      this.WR.post('/User/getCustomerInfoForEdit', {
        token: this.token,
        customer_id: this.customer_id
      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          const data = rs.data
          const obj = {
            name: data.name,
            sex: data.sex + '',
            phone: data.phone

          }
          this.send = obj

          this.timeDisplay = this.dateFormat(data.visiting_time * 1000)
          this.addList.push({
            name: data.floor_name,
            id: data.floor_id
          })
        }
      })
    },
    // 确认修改
    modifyCustom () {
      console.log(this.send)
      this.WR.post('/User/userUpdateCustomer', {
        token: this.token,
        customer_id: this.customer_id,
        customer_name: this.send.name,
        sex: this.send.sex,
        customer_mobile: this.send.phone,
        visiting_time: this.send.time / 1000,
        floor_id: this.addList[0].id

      }).then(rs => {
        console.log(rs)
        if (rs.code === 0) {
          Dialog.alert({
            message: '修改成功！'
          }).then(() => {
            window.history.go(-1)
          })
        } else {
          Dialog({ message: rs.message })
        }
      })
    }
  }
}
</script>
