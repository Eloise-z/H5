<!--
*Author: Eloise
*Date: 2021-07-19 09:01
-->
<template>
  <div style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-list' }">新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news-list' }">新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-table
        :data="newsList"
        style="width: 1200px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="新闻内容：" style="width: 500px; font-weight:bold;">
              <span style="font-weight: normal;">{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="新闻图片：" style="width: 300px">
              <img :src="props.row.imgSrc" alt="" class="myImg">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          label="新闻ID"
          style="width: 100px"
          prop="nid">
      </el-table-column>
      <el-table-column
          label="新闻标题"
          style="width: 200px"
          prop="title">
      </el-table-column>
      <el-table-column
          label="新闻发布时间"
          style="width: 200px"
          prop="createTime">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyNews(scope.row.nid)">修改</el-button>
          <el-button type="text" @click="deleteSelects(scope.row.nid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {newsList as localNewsList} from '../../api/newsList.json'

export default {
  name: "NewsList",
  data() {
    return {
      newsList: [],
      news: {
        nid: '',
        title: '',
        content: '',
        imgSrc: '',
        createTime: ''
      },
      newsListSelections: []
    }
  },
  created() {
    this.newsList = localNewsList
  },
  methods: {
    // 修改新闻
    modifyNews(modifyNid) {
      this.$message.success('修改nid为：' + modifyNid + '的新闻')
      this.$router.push({path: '/news-update', query: {nid: modifyNid}})
    },
    // 删除新闻
    deleteSelects(select) {
      let selectList = this.newsListSelections.map(
          v => {
            return v.nid
          }
      )
      // 得到要删除的id列表
      let deleteNidList = select === null || select === undefined ? selectList : select
      this.$confirm(`确定对 【 新闻ID = ${deleteNidList} 】 进行 【 ${select ? '删除' : '批量删除'} 】 操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 过滤得到删除后的源数据
        this.newsList = this.newsList.filter(
            v => {
              return !deleteNidList.includes(v.nid)
            }
        )
        this.$message.success('删除了 ID 为：' + deleteNidList.toString() + '的新闻')
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.myImg {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
