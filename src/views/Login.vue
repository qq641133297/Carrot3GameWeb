<template>
  <div class="login">
    <div class="login-box" @keyup.enter="login">
      <div class="login-head">用户登录</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账户">
            <template slot="prepend">
              <i class="fa fa-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password">
            <template slot="prepend">
              <i class="fa fa-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="loginForm.isRemember"
            @change="rememberUser"
            class="remember"
            label="记住用户名"
          ></el-checkbox>
          <router-link to="register" style="margin-left:140px">用户注册</router-link>
          <el-button
            class="loign-submit"
            type="primary"
            @click="login"
            :loading="loginLoading"
          >{{loginLoading?'登录中...':'登录'}}</el-button>
          <span v-if="isLoginError" class="el-form-item__error">{{errorMsg}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        isRemember: false
      },
      loginRules: {
        username: [{
          required: true, message: '账号不能为空', trigger: 'change'
        }],
        password: [{
          required: true, message: '密码不能为空', trigger: 'change'
        }]
      },
      loginLoading: false,
      isLoginError: false,
      rememberUser: false,
      errorMsg: ''
    }
  },
  methods: {
    login () {
      this.isLoginError = false
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loginLoading = true
          window.$api.user.login({
            username: this.loginForm.username.trim(),
            password: md5(this.loginForm.password)
          })
            .then(res => {
              console.log(res)
              window.localStorage.setItem('username', this.loginForm.username.trim())
              this.loginLoading = false
              this.$router.push({ name: 'userInfo' })
              this.$message({
                message: res.msg,
                type: 'success'
              })
            })
            .catch(error => {
              if (error.data) this.errorMsg = error.data.msg
              else this.errorMsg = '网络异常'
              this.loginLoading = false
              this.isLoginError = true
            })
        }
      })
      console.log()
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.login-box {
  position: absolute;
  top: calc(45% - 164.5px);
  left: calc(50% - 212px);
  width: 424px;
  height: 329px;
  background: #fff;
  border: 1px solid #dcdcdc;
}
.login-head {
  padding: 28px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
  color: #303133;
}
.login-form {
  padding: 0 50px;
}
.loign-submit {
  width: 100%;
  font-size: 16px;
  height: 40px;
}
.login {
  background-image: url("../assets/background.jpg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
</style>
