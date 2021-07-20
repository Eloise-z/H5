<!--
*Author: Eloise
*Date: 2021-07-19 10:16
-->
<template>
  <div class="mod-user" style="padding-top: 20px; width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/type-list' }">商品类别管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/type-add' }">添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="typeForm" label-width="200px" style="padding: 50px">
      <el-form-item label="分类名称">
        <el-input v-model="typeForm.title" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类状态">
        <el-dropdown split-button type="primary" @command="changeStates">
          {{ sallStatus }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">开启分类</el-dropdown-item>
            <el-dropdown-item command="0">关闭分类</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyNews">添加</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {typeList as typeList} from '../../api/typeList.json'

export default {
  name: "TypeDetail",
  data() {
    return {
      // 源数据
      typeList: [],
      sallStatus:'请选择分类开启状态',

      // 表单数据
      typeForm: {
        tid: '',
        title: '',
        status: '',
        createTime: ''
      }
    }
  },
  methods: {
    // 添加
    modifyNews() {
      this.$message.success('添加成功！')
      this.$router.push('/type-list')
    },
    //修改下拉框状态
    changeStates(command) {
      console.log(command);
      if (command === '1') {
        this.sallStatus = '开启分类';
      } else {
        this.sallStatus = '关闭分类';
      }
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
