<!--
*Author: Eloise
*Date: 2021-07-19 10:16
-->
<template>
  <div class="mod-user" style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-list' }">新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-update' }">修改新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="newsForm" label-width="500px">
      <el-form-item label="NID">
        <el-input v-model="newsForm.nid" disabled></el-input>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="newsForm.title" placeholder="请输入新闻标题"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="newsForm.content" placeholder="请输入新闻内容"></el-input>
      </el-form-item>
      <el-form-item label="新闻发布时间">
        <el-input v-model="newsForm.createTime" placeholder="选择时间"></el-input>
      </el-form-item>
      <el-form-item label="新闻图片">
        <img :src="newsForm.imgSrc" alt="" class="myImg">
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
        <el-button type="primary" @click="modifyNews">修改</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {newsList as localNewsList} from '../../api/newsList.json'

export default {
  name: "ModifyNews",
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
    if (this.$route.query.nid === '' || this.$route.query.nid === null || this.$route.query.nid === undefined) {
      this.$message.warning('列表操作点击 修改 才能访问该页面！')
      this.$router.push('news-list')
    } else {
      this.newsForm.nid = this.$route.query.nid
      for (let n of this.newsList) {
        if (n.nid === this.$route.query.nid) {
          this.newsForm = n
          break
        }
      }
    }
  },
  methods: {
    // 修改新闻
    modifyNews() {
      this.$message.success('修改新闻成功！')
      this.$router.push('/news-list')
    }
  }
}
</script>

<style scoped>
.myImg {
  height: 300px;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
