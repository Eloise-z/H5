<template>
  <div style="padding-top: 20px;width: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/type-list' }">商品类别管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/type-list' }">类别列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-table
        :data="typeList"
        style="width: 100%">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          label="分类编号"
          style="width: 100px"
          prop="tid">
      </el-table-column>
      <el-table-column
          label="分类名称"
          style="width: 200px"
          prop="title">
      </el-table-column>
      <el-table-column
          label="状态"
          style="width: 200px"
          prop="status">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyIt(scope.row.tid)">查看详情</el-button>
          <el-button type="text" @click="deleteSelects(scope.row.tid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {typeList as typeList} from '../../api/typeList.json'

export default {
  name: "TypeList",
  data() {
    return {
      typeList: [],
      type: {
        tid: '',
        title: '',
        status: '',
        createTime: ''
      },
      listSelections: []
    }
  },
  created() {
    this.typeList = typeList
  },
  methods: {
    // 查看详情
    modifyIt(modifyId) {
      this.$message.success('正在查看的ID为：' + modifyId)
      this.$router.push({path: '/type-detail', query: {tid: modifyId}})
    },
    // 删除
    deleteSelects(select) {
      let selectList = this.listSelections.map(
          v => {
            return v.tid
          }
      )
      // 得到要删除的id列表
      let deleteIdList = select === null || select === undefined ? selectList : select
      this.$confirm(`确定对 【 商品类别ID = ${deleteIdList} 】 进行 【 ${select ? '删除' : '批量删除'} 】 操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 过滤得到删除后的源数据
        this.typeList = this.typeList.filter(
            v => {
              return !deleteIdList.includes(v.tid)
            }
        )
        this.$message.success('删除了 ID 为：' + deleteIdList.toString() + ' 的类别')
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>
