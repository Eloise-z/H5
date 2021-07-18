<!--
*Author: Eloise
*Date: 2021-07-16 15:11
-->
<template>
  <div style="background-color: gainsboro; padding-top: 100px; width: 100%; height: 800px">
    <h1 style="font-size: 60px; text-align: center"> 欢迎{{ username }}来到XXX后台系统！</h1>
    <p style="text-align: center; font-size: 30px">{{ nowDate }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: '',
      nowDate: new Date()
    }
  },
  mounted() {
    this.username = JSON.parse(sessionStorage.getItem('EloiseUserLoginSession')).username
    this.getCurrentTime();
    // 设置定时器
    let that = this
    this.timer = setInterval(function () {
      that.newDate = that.getCurrentTime()
    }, 1000)
  },
  // 销毁之前清除定时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    //获取当前系统时间
    getCurrentTime() {
      let that = this
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
      that.nowDate = year + "-" + (month) + "-" + data + " " + hours + ":" + minute + ":" + second;
    }
  }
}
</script>

<style scoped>

</style>
