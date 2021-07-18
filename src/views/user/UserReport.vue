<!--
*Author: Eloise
*Date: 2021-07-18 23:21
-->
<template>
  <div style="margin-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-report' }">用户统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div id="gender"/>
    <div id="role"/>
    <div id="status"/>
  </div>
</template>

<script>
import {userList as localUserList} from '../../api/userList.json'
import Vue from 'vue'

export default {
  name: "UserReport",
  data() {
    return {
      // 源数据
      userList: localUserList
    }
  },
  computed: {
    genderList() {
      let g1 = 0, g2 = 0, g3 = 0
      this.userList.forEach(
          v => {
            if (v.gender === 1) {
              g1++
            } else if (v.gender === 2) {
              g2++
            } else if (v.gender === 3) {
              g3++
            }
          }
      )
      return [g1, g2, g3]
    },
    roleList() {
      let r1 = 0, r2 = 0
      this.userList.forEach(
          v => {
            if (v.role === 1) {
              r1++
            } else if (v.role === 2) {
              r2++
            }
          }
      )
      return [r1, r2]
    },
    statusList() {
      let s1 = 0, s2 = 0
      this.userList.forEach(
          v => {
            if (v.status === 1) {
              s1++
            } else if (v.status === 2) {
              s2++
            }
          }
      )
      return [s1, s2]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.echartsInit()
    })
  },
  methods: {
    // 初始化echarts
    echartsInit() {
      const that = this
      // 柱形图
      Vue.prototype.$echarts.init(document.getElementById('gender')).setOption({
        title: {
          text: '性别统计',
          textStyle: {
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: ['男', '女', '保密']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: that.genderList,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示数值
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              }
            }
          }
        }]
      })
      Vue.prototype.$echarts.init(document.getElementById('role')).setOption({
        title: {
          text: '类型统计',
          textStyle: {
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: ['管理员', '普通用户']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: that.roleList,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示数值
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              }
            }
          }
        }]
      })
      Vue.prototype.$echarts.init(document.getElementById('status')).setOption({
        title: {
          text: '用户状态统计',
          textStyle: {
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: ['正常', '限制登录']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: that.statusList,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示数值
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              }
            }
          }
        }]
      })
    }
  }
}
</script>

<style scoped>
#gender {
  width: 300px;
  height: 300px;
  margin-left: 30px;
  display: inline;
  float: left;
}

#role {
  width: 200px;
  height: 300px;
  margin-left: 30px;
  display: inline;
  float: left;
}

#status {
  width: 200px;
  height: 300px;
  margin-left: 30px;
  display: inline;
  float: left;
}
</style>
