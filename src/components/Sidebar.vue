<!--
*Author: Eloise
*Date: 2021-07-16 16:25
-->
<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgba(238, 241, 246, 0.1)">
      <el-menu :default-openeds="[]">
        <el-menu-item style="text-align: center" index="0-1" @click="$router.push('/index')">蜜雪冰城甜蜜蜜</el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="$router.push('/user-list')">用户列表</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push('/user-add')">添加用户</el-menu-item>
            <el-menu-item index="1-3" @click="$router.push('/user-update')">修改用户</el-menu-item>
            <el-menu-item index="1-4" @click="$router.push('/user-report')">用户统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">商品列表</el-menu-item>
            <el-menu-item index="2-2">添加商品</el-menu-item>
            <el-menu-item index="2-3">修改商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>商品类别管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">商品类别列表</el-menu-item>
            <el-menu-item index="3-2">添加商品类别</el-menu-item>
            <el-menu-item index="3-3">修改商品类别</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
          <el-menu-item-group>
            <el-menu-item index="4-1">订单列表</el-menu-item>
            <el-menu-item index="4-2">添加订单</el-menu-item>
            <el-menu-item index="4-3">修改订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-s-promotion"></i>新闻管理</template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="$router.push('/news-list')">新闻列表</el-menu-item>
            <el-menu-item index="5-2" @click="$router.push('/news-add')">添加新闻</el-menu-item>
            <el-menu-item index="5-3" @click="$router.push('/news-update')">修改新闻</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <router-view/>
  </el-container>
</template>
