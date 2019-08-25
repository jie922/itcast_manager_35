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
    <el-button type="success" @click="addDialogFormVisible=true">添加用户</el-button>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size='usersobj.pagesize'
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :rules="rules" :label-width="'80px'" ref="addForm">
          <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="密码" prop='password'>
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="邮箱" prop='email'>
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop='mobile'>
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { getAllUsers, addUser } from '@/api/user_index.js'
export default {
  data () {
    return {
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      usersList: [],
      usersobj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            // 添加正则表达式
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法的电子邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {

    // 新增用户
    add () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success('添加用户成功')
                // 重新刷新页面
                this.init()
                // 关闭弹框
                this.addDialogFormVisible = false
                this.$refs.addForm.resetFields()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('添加用户失败')
            })
        } else {
          this.$message.warning('请输入所有必填数据')
        }
      })
    },
    // 切换sizes下拉列表时触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.usersobj.pagesize = val
      this.init()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 修改参数
      this.usersobj.pagenum = val
      // 重新请求
      this.init()
    },
    //   数据获取
    init () {
      getAllUsers(this.usersobj)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            // 获取记录总数
            this.total = res.data.data.total
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
