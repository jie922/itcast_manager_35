<template>
  <div class="rightLists">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightList" border style="width: 60%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
              <span>{{scope.row.level | levelFormat}}</span>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllrightList } from '@/api/rightList_index.js'
export default {
  data () {
    return {
      rightList: [] // 权限列表所有数据的容器
    }
  },
  //   添加过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },

  //   获取权限列表的所有数据
  mounted () {
    getAllrightList('list')
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.rightList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(() => {
        // console.log(err)
        this.$message.error('数据获取失败')
      })
  }
}

</script>
<style lang="less" scoped>
.el-breadcrumb {
  font-size: 15px;
  line-height: 45px;
}
</style>
