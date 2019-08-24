<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="userskey" class="input-with-select" style="width:300px;margin-right:10px;">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success">添加用户</el-button>
    </div>
    <!-- 表格展示区域 -->
    <!-- 分页区域 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      userskey: ''
    }
  }
}
</script>
<style scoped>
    .el-breadcrumb {
    font-size: 15px;
    line-height: 45px;
    }
</style>
