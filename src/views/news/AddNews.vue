<!--
*Author: Eloise
*Date: 2021-07-19 09:58
-->
<template>
  <div class="mod-user" style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-list' }">新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-add' }">添加新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="newsForm" label-width="500px">
      <el-form-item label="NID">
        <el-input v-model="newsForm.nid" placeholder="nid自动生成" disabled></el-input>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="newsForm.title" placeholder="请输入新闻标题"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="newsForm.content" placeholder="请输入新闻内容"></el-input>
      </el-form-item>
      <el-form-item label="新闻发布时间">
        <el-input v-model="newsForm.createTime" placeholder="时间自动生成" disabled></el-input>
      </el-form-item>
      <el-form-item label="新闻图片">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNews">创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {newsList as localNewsList} from '../../api/newsList.json'

export default {
  name: "AddNews",
  data() {
    return {
      // 源数据
      newsList: [],

      // 表单数据
      newsForm: {
        nid: '',
        title: '',
        content: '',
        imgSrc: '',
        createTime: ''
      }
    }
  },
  created() {
    this.newsList = localNewsList
  },
  methods: {
    // 添加新闻
    addNews() {
      this.newsForm.imgSrc = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      this.newsForm.createTime = this.getCurrentTime()
      this.newsForm.nid = (parseInt(this.newsList[this.newsList.length - 1].nid) + 1).toString()
      this.newsList.push(this.newsForm)
      this.$message.success('添加新闻成功！')
      this.$router.push('/news-list')
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
