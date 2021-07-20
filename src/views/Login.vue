<!--
 * @Author: your name
 * @Date: 2021-07-16 15:10:22
 * @LastEditTime: 2021-07-16 18:26:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\views\login.vue
-->
<template>
  <div id="login">
    <div class="container">
      <p class="headWord">蜜雪冰城甜蜜蜜 后台管理系统</p>
      <div class="loginBox">
        <div class="inputBox">
          <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-width="60px">
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="loginForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from '@/api/login'
import Vue from "vue";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        pwd: ''
      },
      loginRule: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9]+$/, message: '密码只包含数字和英文字母，不包含特殊字符'}
        ]
      }
    }
  },
  methods: {
    submitForm() {
      const that = this
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          if (loginApi.loginCheck(that.loginForm)) {
            sessionStorage.setItem('EloiseUserLoginSession', JSON.stringify(that.loginForm));
            Vue.prototype.$message.success('登录成功！')
            that.$router.push({path: '/index'})
          } else {
            Vue.prototype.$message.warning('登录失败：用户名或密码错误！')
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['loginForm'].resetFields();
    }
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
.container {
  background: url("https://www.mxbc.com/media/upload/index/%E8%9C%9C%E9%9B%AA%E5%86%B0%E5%9F%8Ebanner1920x900.jpg") no-repeat;
  background-size:cover;
  width: 100%;
  height: 100vh;
  position: relative;
}

.loginBox {
  border-radius: 3%;
  padding: 50px;
  top: 30%;
  width: 300px;
  height: 150px;
  right: 60%;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
}

  .headWord {
    position: absolute;
    top: 20%;
    right: 60%;
    font-size: 30px;
    font-weight: bold;
    color: white;
  }

</style>
