<!--
*Author: Eloise
*Date: 2021-07-18 18:55
-->
<template>
  <div class="mod-user" style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-update' }">修改用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="userForm" label-width="500px">
      <el-form-item label="UID">
        <el-input v-model="userForm.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userForm.gender">
          <el-radio label="男" value="1"></el-radio>
          <el-radio label="女" value="2"></el-radio>
          <el-radio label="保密" value="3"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="userForm.role" placeholder="默认普通用户">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="userForm.status" placeholder="默认正常">
          <el-option label="正常" value="1"></el-option>
          <el-option label="限制登录" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyUser">修改</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {userList as localUserList} from '../../api/userList.json'
import Vue from "vue";

export default {
  name: "ModifyUser",
  data() {
    return {
      // 源数据
      userList: localUserList,

      // 表单数据
      userForm: {
        uid: '',
        name: '',
        gender: '',
        role: '',
        status: '',
        createTime: '',
        updateTime: ''
      },

      // 数据映射
      genderOptions: [{
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }, {
        value: 3,
        label: '保密'
      }],
      roleOptions: [{
        value: 1,
        label: '管理员'
      }, {
        value: 2,
        label: '普通用户'
      }],
      statusOptions: [{
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '限制登录'
      }]
    }
  },
  created() {
    if (this.$route.query.uid === '' || this.$route.query.uid === null || this.$route.query.uid === undefined) {
      Vue.prototype.$message.warning('列表操作点击修改才能访问该页面！')
      this.$router.push('user-list')
    } else {
      this.userForm.uid = this.$route.query.uid
      for (let u of this.userList) {
        if (u.uid === this.$route.query.uid) {
          this.userForm = u
          for (let g of this.genderOptions) {
            if (g.value === u.gender) {
              this.userForm.gender = g.label
            }
          }
          this.userForm.role = this.userForm.role.toString()
          this.userForm.status = this.userForm.status.toString()
          break
        }
      }
    }
  },
  methods: {
    // 修改用户
    modifyUser() {
      this.userForm.role = parseInt(this.userForm.role)
      this.userForm.status = parseInt(this.userForm.status)
      if (this.userForm.gender === '男') {
        this.userForm.gender = 1
      } else if (this.userForm.gender === '女') {
        this.userForm.gender = 2
      } else {
        this.userForm.gender = 3
      }
      Vue.prototype.$message.success('修改成功！')
      this.$router.push('/user-list')
    }
  }
}
</script>

<style scoped>

</style>
