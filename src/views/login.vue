<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入接口方法
import { login } from '@/api/login_index.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      //   实现二次验证：实现弹出提示框，3秒后消失
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then((res) => {
              if (res.data.meta.status === 200) {
                // console.log(res)
                // 将token存储到本地
                localStorage.setItem('itcast_manager_35_Token', res.data.data.token)
                // 实现页面跳转
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  //    提示信息
                  message: res.data.meta.msg,
                  //   提示类型
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              this.$message({
                //    提示信息
                message: '服务器异常，请稍后重试',
                //   提示类型
                type: 'warning'
              })
            })
        } else {
          this.$message({
            //    提示信息
            message: '请正确输入所有信息',
            //   提示类型
            type: 'warning'
          })
          //   //   另一种写法
          //   this.$message.error('请正确输入所有信息')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 350px;
    padding: 0px 40px 15px 40px;
    // border: 1px solid #e6e2e2;
    box-shadow: 0 10px 20px #95b7bde0;
    margin: 200px auto;
    background: #95eff588;

    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: 30px;
      margin-bottom: 30px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 5px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
