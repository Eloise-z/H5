<!--
*Author: Eloise
*Date: 2021-07-17 21:31
-->
<template>
  <div style="background-color: gainsboro; margin-top: 0; height: 100%">
    <h1 style="font-size: 150px; margin-top: 0; padding-top: 100px; text-align: center"> 404 !</h1>
    <p>没找到对应页面，也许是您输入的路径有问题</p>
    <hr>
    <p>您可以点击下方链接去不同页面</p>
    <div style="text-align: center">
      <router-link class="myLink" to="/index">首页</router-link>
      <router-link class="myLink" to="/login">登录</router-link>
      <router-link class="myLink" to="/" @click="$router.back()">返回</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFind'
}
</script>

<style scoped>
p{
  text-align: center;
  font-size: 20px
}
.myLink {
  font-size: 20px;
  margin-right: 5px;
  color: black;
}
</style>
