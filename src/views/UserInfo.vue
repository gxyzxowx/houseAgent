<!--
 * @Date         : 2020-05-20 17:52:27
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-28 10:49:09
 * @FilePath     : \agent\src\views\UserInfo.vue
 * @Description  : 个人信息
-->
<style lang="scss" scoped>
.username {
  .pic {
    @include square(1rem);
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
    img {
      @include square(100%);
    }
  }
}
.van-cell__title {
  text-align: start;
  text-indent: 0.1rem;
}
.nolink .van-cell__value span {
  padding-right: 0.4rem;
}
</style>
<template>
  <div>
    <van-cell-group>
      <van-cell title="头像" class="username">
        <template #right-icon>
          <div class="pic">
            <img :src="avatar" alt />
          </div>
        </template>
      </van-cell>
      <van-cell title="姓名" :value="nickname" is-link @click="showName = !showName"/>
      <van-cell title="手机号码" :value="phone" class="nolink" />
      <van-cell title="性别" :value="sex" is-link @click="changeSex" />
      <!-- <van-cell title="城市" :value="cityVal" is-link @click="showCity=!showCity" /> -->
      <!-- <van-cell title="邀请码" value="内容" class="nolink" /> -->
      <van-cell title="绑定上线" :value="master_nickname" class="nolink" />
    </van-cell-group>
    <!-- 选择性别 -->
    <van-action-sheet
      v-model="showSex"
      :actions="sexActions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="selectSex"
    />

    <!-- 选择城市 -->
    <!-- <van-action-sheet v-model="showCity" title="请选择">
  <div class="content">
        <van-area title="城市选择" :area-list="areaList"
    @confirm="selectCity"
    @cancel="onCancel" />
  </div>
</van-action-sheet> -->

<!-- 填写姓名 -->
<van-dialog v-model="showName" title="修改姓名" show-cancel-button @confirm="selectName">
  <div class="editname">
    <van-field v-model="name0" label="姓名：" placeholder="请输入..."/>
  </div>
</van-dialog>

<!-- 上传头像 -->
<van-dialog v-model="showPic" title="上传头像" show-cancel-button @confirm="selectPic">
  <div class="editpic">
     <!-- <input
              ref="input"
              type="file"
              accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
              @change="handleFileChange"
            > -->
            <van-uploader v-model="fileList" :after-read="handleFileChange" />
  </div>
</van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, ActionSheet, Area, Dialog, Field, Uploader, Toast } from 'vant'
import areaList from '@/assets/js/area.js'

Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Area)
Vue.use(ActionSheet)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      sexActions: [{ name: '男' }, { name: '女' }],
      sex: '暂无',
      cityVal: '暂无',
      nickname: '暂无',
      phone: '暂无',
      master_nickname: '',
      avatar: '',
      fileList: [],
      name0: '',
      // 选择 弹窗显示
      showSex: false,
      showCity: false,
      showName: false,
      showPic: false,
      areaList: {}
    }
  },
  created () {
    this.areaList = areaList
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/User/getUserInfo', {
        token: this.token
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            this.avatar = rs.data.avatar
            this.sex = rs.data.sex === 1 ? '女' : '男'
            this.phone = rs.data.phone
            this.nickname = rs.data.nickname
            this.master_nickname = rs.data.master_nickname
          }
        })
    },
    changeInfo (nickname, sex) {
      console.log(nickname)
      console.log(sex)
      this.WR.post('/User/editUserInfo', {
        token: this.token,
        nickname: nickname,
        sex: sex
      })
        .then(rs => {
          console.log(rs)
          if (rs.code === 0) {
            Toast('修改成功')
            this.getData()
          } else {
            Dialog({ message: rs.message })
          }
        })
    },
    // 点击取消（共用）
    onCancel () {
      this.showSex = false
    },
    // 性别--点击弹窗层
    changeSex () {
      this.showSex = true
    },
    // 性别--选择性别
    selectSex (val, index) {
      // console.log(val, as)
      this.showSex = false
      this.sex = val.name
      const sex = this.sex === '女' ? 1 : 2
      this.changeInfo('', sex)
      // 发送给后台
    },
    // 城市--选择城市
    selectCity (val, ty) {
      console.log(val, ty)
      this.showCity = false
      this.cityVal = `${val[0].name} - ${val[1].name} - ${val[2].name}`
      // 发送给后端
    },
    // 姓名 填写后确认
    selectName (val, ty) {
      // console.log(val, ty)
      this.nickname = this.name0
      this.changeInfo(this.nickname, '')
    },
    // 图片本地获取
    handleFileChange (file) {
      console.log(file)
    },
    selectPic (val) {
      console.log(val)
    }
  }
}
</script>
