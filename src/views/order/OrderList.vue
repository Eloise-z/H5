<template>
    <div style="padding-top: 20px;width: 100%">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order-list' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order-list' }">订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table
                :data="orderList"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="订单编号"
                    style="width: 100px"
                    prop="oid">
            </el-table-column>
            <el-table-column
                    label="订单商品名称"
                    style="width: 200px"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="付款金额"
                    style="width: 200px"
                    prop="price">
            </el-table-column>
            <el-table-column
                    label="订单状态"
                    style="width: 200px"
                    prop="status">
            </el-table-column>
            <el-table-column
                    label="购买数量"
                    style="width: 200px"
                    prop="num">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    header-align="center"
                    align="center"
                    width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifyIt(scope.row.oid)">查看详情</el-button>
                    <el-button type="text" @click="deleteSelects(scope.row.oid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {orderList as orderList} from '../../api/orderList.json'

    export default {
        name: "OrderList",
        data() {
            return {
                orderList: [],
                order: {
                    oid: '',
                    title: '',
                    num:'',
                    price:'',
                    status: '',
                    content: '',
                    createTime: ''
                },
                listSelections: []
            }
        },
        created() {
            this.orderList = orderList
        },
        methods: {
            // 查看详情
            modifyIt(modifyId) {
                this.$message.success('正在查看的ID为：' + modifyId)
                this.$router.push({path: '/order-detail', query: {oid: modifyId}})
            },
            // 删除
            deleteSelects(select) {
                let selectList = this.listSelections.map(
                    v => {
                        return v.oid
                    }
                )
                // 得到要删除的id列表
                let deleteIdList = select === null || select === undefined ? selectList : select
                // 过滤得到删除后的源数据
                this.orderList = this.orderList.filter(
                    v => {
                        return !deleteIdList.includes(v.oid)
                    }
                )
                this.$message.success('删除了ID为：' + deleteIdList.toString())
            }
        }
    }
</script>

<style scoped>

</style>
