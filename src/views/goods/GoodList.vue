<template>
    <div style="padding-top: 20px;width: 100%">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 0 0 0 20px">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods-list' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods-list' }">商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table
                :data="goodsList"
                style="width: 100%">
<!--            <el-table-column type="expand">-->
<!--                <template slot-scope="props">-->
<!--                    <el-form label-position="left" inline class="demo-table-expand">-->
<!--                        <el-form-item label="新闻内容：" style="width: 500px; font-weight:bold;">-->
<!--                            <span style="font-weight: normal;">{{ props.row.content }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="新闻图片：" style="width: 300px">-->
<!--                            <img :src="props.row.imgSrc" alt="" class="myImg">-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="商品ID"
                    style="width: 100px"
                    prop="gid">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    style="width: 200px"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="销售价格"
                    style="width: 200px"
                    prop="price">
            </el-table-column>
            <el-table-column
                    label="商品状态"
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
                    <el-button type="text" @click="modifyIt(scope.row.gid)">修改</el-button>
                    <el-button type="text" @click="deleteSelects(scope.row.gid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {goodsList as goodsList} from '../../api/goodsList.json'

    export default {
        name: "GoodList",
        data() {
            return {
                goodsList: [],
                goods: {
                    gid: '',
                    title: '',
                    price:'',
                    status: '',
                    imgSrc: '',
                    createTime: ''
                },
                listSelections: []
            }
        },
        created() {
            this.goodsList = goodsList
        },
        methods: {
            // 修改
            modifyIt(modifyId) {
                this.$message.success('正在修改的ID为：' + modifyId)
                this.$router.push({path: '/goods-update', query: {gid: modifyId}})
            },
            // 删除
            deleteSelects(select) {
                let selectList = this.listSelections.map(
                    v => {
                        return v.gid
                    }
                )
                // 得到要删除的id列表
                let deleteIdList = select === null || select === undefined ? selectList : select
                // 过滤得到删除后的源数据
                this.goodsList = this.goodsList.filter(
                    v => {
                        return !deleteIdList.includes(v.gid)
                    }
                )
                this.$message.success('删除了ID为：' + deleteIdList.toString())
            }
        }
    }
</script>

<style scoped>

</style>
