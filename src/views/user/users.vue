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
    <el-input placeholder="请输入内容" v-model="usersobj.query"
     class="input-with-select" style="width:300px;margin-right:10px;" @input.native="init">
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <el-button type="success">添加用户</el-button>
    </div>
    <!-- 表格展示区域 -->
     <el-table :data="usersList" border style="width: 100%; margin-top: 15px">
        <el-table-column type="index" width="50"> </el-table-column> <!--添加索引列-->
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <!-- 用户状态列：使用自定义模板列，方便后期获取数据 -->
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
            </template>
        </el-table-column>
        <!-- 操作列：使用自定义模板列，方便后期获取数据 -->
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button type="primary" plain icon="el-icon-edit"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                    <el-button type="success" plain icon="el-icon-share"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button type="danger" plain icon="el-icon-delete"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页区域 -->
  </div>
</template>
<script>
import { getAllUsers } from '@/api/user_index.js'
export default {
  data () {
    return {
      usersList: [],
      usersobj: {
        query: '',
        pagenum: 1,
        pagesize: 4
      }
    }
  },
  methods: {
    //   数据获取
    init () {
      getAllUsers(this.usersobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.usersList = res.data.data.users
          } else if (res.data.meta.status === 400) {
          // 弹出消息提示，并返回登录页面
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
    .el-breadcrumb {
    font-size: 15px;
    line-height: 45px;
    }
</style>
