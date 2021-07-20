<template>
  <div class="mod-user" style="padding-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user-list' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form :inline="true" :model="queryUser" style="padding: 0 0 0 10px">
      <el-form-item style="width: 130px">
        <el-input v-model="queryUser.uid" placeholder="UID" clearable></el-input>
      </el-form-item>
      <el-form-item style="width: 180px">
        <el-input v-model="queryUser.name" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item style="width: 130px">
        <el-select v-model="queryUser.gender" clearable placeholder="性别">
          <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 130px">
        <el-select v-model="queryUser.role" clearable placeholder="类型">
          <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 130px">
        <el-select v-model="queryUser.status" clearable placeholder="状态">
          <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="isQuery = true">查询</el-button>
        <el-button type="success" @click="$router.push('/user-add')">新增</el-button>
        <el-button type="danger" @click="deleteSelects()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="getDataList"
        border
        stripe
        size="medium"
        @selection-change="selectionChangeHandle"
        style="width: 100%;">
      <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50">
      </el-table-column>
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          prop="uid"
          header-align="center"
          align="center"
          width="80"
          label="UID">
      </el-table-column>
      <el-table-column
          prop="name"
          header-align="center"
          align="center"
          width="200"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="gender"
          header-align="center"
          align="center"
          width="100"
          label="性别"
          :formatter="genderFormat">
      </el-table-column>
      <el-table-column
          prop="role"
          header-align="center"
          align="center"
          label="类型"
          width="150"
          :formatter="roleFormat">
      </el-table-column>
      <el-table-column
          prop="status"
          header-align="center"
          align="center"
          label="状态"
          width="150"
          :formatter="statusFormat">
      </el-table-column>
      <el-table-column
          prop="createTime"
          header-align="center"
          align="center"
          width="200"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="updateTime"
          header-align="center"
          align="center"
          width="200"
          label="更新时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyUser(scope.row.uid)">修改</el-button>
          <el-button type="text" @click="deleteSelects(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[5, 8, 10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalData"
        style="margin: 5px 0 0 10px"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import {userList as localUserList} from '../../api/userList.json'

export default {
  data() {
    return {
      // 源数据
      userList: localUserList,
      queryList: [],

      // 分页相关
      pageIndex: 1,
      pageSize: 8,

      // 查询相关
      isQuery: false,
      userListSelections: [],
      queryUser: {
        uid: '',
        name: '',
        gender: '',
        role: '',
        status: ''
      },

      // 数据映射
      genderOptions: [{
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }, {
        value: 3,
        label: '保密'
      }],
      roleOptions: [{
        value: 1,
        label: '管理员'
      }, {
        value: 2,
        label: '普通用户'
      }],
      statusOptions: [{
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '限制登录'
      }]
    }
  },
  computed: {
    // 获取数据列表
    getDataList() {
      console.log('computed');

      let res = []
      let index = 0
      let that = this
      let queryUser = this.queryUser

      // 查询
      if (this.isQuery) {
        // 对应参数的模糊查询
        this.queryList = this.userList.filter(
            v => {
              return v.name.includes(queryUser.name) && v.uid.includes(queryUser.uid)
                  && v.gender.toString().includes(queryUser.gender) && v.status.toString().includes(queryUser.status)
                  && v.role.toString().includes(queryUser.role)
            }
        )
        res = this.queryList.slice((that.pageIndex - 1) * that.pageSize, that.pageIndex * that.pageSize)
        // this.isQuery = false
        return res
      }

      // 默认的非查询数据
      this.userList.map(
          v => {
            // 对应页开始
            if (index >= (that.pageIndex - 1) * that.pageSize && index < that.pageIndex * that.pageSize) {
              res.push(v)
            }
            index++
          }
      )
      console.log(this.userList);
      this.queryList = this.userList
      console.log(res);
      return res
    },
    totalData() {
      return this.queryList.length
    }
  },
  methods: {
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
    },
    // 多选
    selectionChangeHandle(val) {
      this.userListSelections = val
    },
    // 删除选择的
    deleteSelects(select) {
      let selectList = this.userListSelections.map(
          v => {
            return v.uid
          }
      )
      // 得到要删除的id列表
      let deleteUidList = select === null || select === undefined ? selectList : select
      if (deleteUidList.length === 0){
        this.$message.warning('请先选择要删除的用户！')
      }
      // 过滤得到删除后的源数据
      this.userList = this.userList.filter(
          v => {
            return !deleteUidList.includes(v.uid)
          }
      )
    },
    modifyUser(modifyUid) {
      this.$router.push({path: '/user-update', query: {uid: modifyUid}})
    },
    genderFormat(scope) {
      if (scope.gender === 1) {
        return '男'
      } else if (scope.gender === 2) {
        return '女'
      } else if (scope.gender === 3) {
        return '保密'
      } else {
        return '未知性别'
      }
    },
    roleFormat(scope) {
      if (scope.role === 1) {
        return '管理员'
      } else if (scope.role === 2) {
        return '普通用户'
      } else {
        return '未知类型'
      }
    },
    statusFormat(scope) {
      if (scope.status === 1) {
        return '正常'
      } else if (scope.status === 2) {
        return '限制登录'
      } else {
        return '无对应状态'
      }
    }
  }
}
</script>

<style scoped>

</style>
