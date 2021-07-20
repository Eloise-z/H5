<!--
*Author: Eloise
*Date: 2021-07-16 15:11
-->
<template>
  <div class="myHome">
    <div class="content">
      <h1 class="myH1"> 欢迎{{ username }}</h1>
      <h1 class="myH1"> 来到 蜜雪冰城甜蜜蜜 后台系统！</h1>
      <p class="myP">{{ nowDate }}</p>
    </div>
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
.myHome {
  /*padding-top: 100px;*/
  width: 100%;
  height: 100vh;
  background: url("https://www.mxbc.com/media/upload/banner/1920x500-pc%E7%AB%AF%E4%BA%A7%E5%93%81%E5%B1%95%E7%A4%BA.jpg") no-repeat;
  background-size: cover;
}

.content {
  height: 100%;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.7);
}

.myH1 {
  font-size: 60px;
  text-align: center;
  color: #1E90FF;
}

.myP {
  text-align: center;
  font-size: 30px;
  color: #1E90FF;
}
</style>
