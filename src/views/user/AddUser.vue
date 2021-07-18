<!--
*Author: Eloise
*Date: 2021-07-18 18:55
-->
<template>
  <div class="mod-user" style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-add' }">添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="userForm" label-width="500px">
      <el-form-item label="UID">
        <el-input v-model="userForm.uid" placeholder="uid自动生成" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userForm.name" placeholder="请输入您的用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
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
        <el-button type="primary" @click="addUser">创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {userList as localUserList} from '../../api/userList.json'
import Vue from "vue";

export default {
  name: "AddUser",
  data() {
    return {
      // 源数据
      userList: localUserList,

      // 表单数据
      userForm: {
        uid: '',
        name: '',
        gender: '保密',
        role: '2',
        status: '1'
      }
    }
  },
  methods: {
    // 添加用户
    addUser() {
      this.userForm.role = parseInt(this.userForm.role)
      this.userForm.status = parseInt(this.userForm.status)
      if (this.userForm.gender === '男') {
        this.userForm.gender = 1
      } else if (this.userForm.gender === '女') {
        this.userForm.gender = 2
      } else {
        this.userForm.gender = 3
      }
      this.userForm.createTime = this.getCurrentTime()
      this.userForm.updateTime = this.getCurrentTime()
      this.userForm.uid = (parseInt(this.userList[this.userList.length - 1].uid) + 1).toString()
      this.userList.push(this.userForm)
      Vue.prototype.$message.success('添加成功！')
      this.$router.push('/user-list')
    },
    //获取当前系统时间
    getCurrentTime() {
      let date = new Date();
      let year = date.getFullYear(); //年
      let month = date.getMonth() + 1; //月
      let data = date.getDate(); //天
      let hours = date.getHours(); //小时
      let minute = date.getMinutes(); //分
      let second = date.getSeconds(); //秒
      month = month < 10 ? '0' + month : month
      data = data < 10 ? '0' + data : data
      hours = hours < 10 ? '0' + hours : hours
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return year + "-" + (month) + "-" + data + " " + hours + ":" + minute + ":" + second;
    }
  }
}
</script>

<style scoped>

</style>
