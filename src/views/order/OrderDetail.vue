<!--
*Author: Eloise
*Date: 2021-07-19 10:16
-->
<template>
  <div class="mod-user" style="padding-top: 20px; width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order-list' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order-detail' }">订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="userForm" :model="goodsForm" label-width="200px" style="padding: 50px">
      <el-form-item label="订单编号">
        <el-input v-model="orderForm.oid" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="orderForm.title" placeholder="请输入商品名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="付款金额">
        <el-input v-model="orderForm.price" placeholder="输入付款金额" disabled></el-input>
      </el-form-item>
      <el-form-item label="购买数量">
        <el-input v-model="orderForm.num" placeholder="请输入购买数量" disabled></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-dropdown split-button type="primary" @command="changeStates">
          {{ sallStatus }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">接单</el-dropdown-item>
            <el-dropdown-item command="0">取消接单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="orderForm.content" placeholder="按餐量提供餐具" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyNews">修改</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {orderList as orderList} from '../../api/orderList.json'

export default {
  name: "OrderDetail",
  data() {
    return {
      // 源数据
      orderList: [],
      sallStatus:'',

      // 表单数据
      orderForm: {
        oid: '',
        title: '',
        num:'',
        price:'',
        status: '',
        content: '',
        createTime: ''
      }
    }
  },
  created() {
    this.orderList = orderList
    if (this.$route.query.oid === '' || this.$route.query.oid === null || this.$route.query.oid === undefined) {
      this.$message.warning('列表操作点击 查看详情 才能访问该页面！')
      this.$router.push('order-list')
    } else {
      this.orderForm.oid = this.$route.query.oid
      for (let n of this.orderList) {
        if (n.oid === this.$route.query.oid) {
          this.orderForm = n
          this.sallStatus = this.orderForm.status
          break
        }
      }
    }
  },
  methods: {
    // 修改
    modifyNews() {
      this.$message.success('修改订单信息成功！')
      this.$router.push('/order-list')
    },
    //修改下拉框状态
    changeStates(command) {
      console.log(command);
      if (command === '1') {
        this.sallStatus = '接单';
      } else {
        this.sallStatus = '取消接单';
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
