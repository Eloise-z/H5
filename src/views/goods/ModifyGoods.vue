<!--
*Author: Eloise
*Date: 2021-07-19 10:16
-->
<template>
  <div class="mod-user" style="padding-top: 20px; width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods-list' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods-update' }">修改商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="goodsForm" label-width="200px" style="padding: 50px">
      <el-form-item label="GID">
        <el-input v-model="goodsForm.gid" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="goodsForm.title" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="goodsForm.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-dropdown split-button type="primary" @command="changeStates">
          {{ sallStatus }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">正常销售</el-dropdown-item>
            <el-dropdown-item command="0">暂停销售</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="商品发布时间">
        <el-calendar v-model="value">
        </el-calendar>
       <!-- <el-input v-model="goodsForm.createTime" placeholder="选择时间"></el-input>-->
      </el-form-item>
      <el-form-item label="商品图片">
        <img :src="goodsForm.imgSrc" alt="" class="myImg">
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
import {goodsList as goodsList} from '../../api/goodsList.json'

export default {
  name: "ModifyGoods",
  data() {
    return {
      // 源数据
      goodsList: [],
      sallStatus:'',

      // 表单数据
      goodsForm: {
        gid: '',
        title: '',
        status: '',
        price:'',
        imgSrc: '',
        createTime: ''
      }
    }
  },
  created() {
    this.goodsList = goodsList
    if (this.$route.query.gid === '' || this.$route.query.gid === null || this.$route.query.gid === undefined) {
      this.$message.warning('列表操作点击修改才能访问该页面！')
      this.$router.push('goods-list')
    } else {
      this.goodsForm.gid = this.$route.query.gid
      for (let n of this.goodsList) {
        if (n.gid === this.$route.query.gid) {
          this.goodsForm = n
          this.sallStatus = this.goodsForm.status
          break
        }
      }
    }
  },
  methods: {
    // 修改新闻
    modifyNews() {
      this.$message.success('修改商品成功！')
      this.$router.push('/goods-list')
    },
    //修改下拉框状态
    changeStates(command) {
      console.log(command);
      if (command === '1') {
        this.sallStatus = '正常销售';
      } else {
        this.sallStatus = '暂停销售';
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
