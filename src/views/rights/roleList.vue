<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="success">成功按钮</el-button>
    <el-table :data="roleList" border style="width: 100%; margin-top: 15px">
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id" style="margin-bottom:15px;">
            <el-col :span="4">
              <el-tag closable :type="'success'">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:10px;">
                <el-col :span="4">
                  <el-tag closable :type="'info'">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    :type="'warning'"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-bottom:5px;margin-right:5px;" @close="delRight(scope.row,third.id)">
                    {{third.authName}}
                    </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show='scope.row.children.length===0'>
             还没有任何权限，请先分配！!
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <!--添加索引列-->
      <el-table-column type="index" width="50"></el-table-column>

      <!-- 表格内容列 -->
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <!-- 操作列：使用自定义模板列，方便后期获取数据 -->
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="top">
            <el-button type="success" plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoleList, delrRightByRoleId } from '@/api/role_index.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  methods: {
    // 删除角色指定的权限
    delRight (row, rightId) {
      delrRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 刷新
            // this.init() //刷新整个页面，体验效果差
            row.children = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    init () {
      getAllRoleList().then(res => {
      // console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  font-size: 15px;
  line-height: 45px;
}
</style>
