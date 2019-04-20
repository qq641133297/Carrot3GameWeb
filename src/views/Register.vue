<template>
  <div class="register">
    <div class="register-box" @keyup.enter="register">
      <div class="register-head">账号注册</div>
      <el-form
        ref="registerForm"
        :model="registerForm"
        status-icon
        :rules="registerRules"
        class="register-form"
      >
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="账户">
            <template slot="prepend">
              <i class="fa fa-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="密码" type="password">
            <template slot="prepend">
              <i class="fa fa-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="registerForm.repassword" placeholder="确认密码" type="password">
            <template slot="prepend">
              <i class="fa fa-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <router-link to="login" style="margin-left:260px">用户登录</router-link>
          <el-button
            class="loign-submit"
            type="primary"
            @click="register"
            :loading="registerLoading"
          >{{registerLoading?'注册中...':'注册'}}</el-button>
          <span v-if="isRegisterError" class="el-form-item__error">{{errorMsg}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data () {
    let checkRe = (rule, value, callback) => {
      if (this.registerForm.password !== this.registerForm.repassword) {
        return callback(new Error('密码不一致'))
      }
      callback()
    }
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: ''
      },
      registerRules: {
        username: [{
          required: true, message: '账号不能为空', trigger: 'change'
        }],
        password: [{
          required: true, message: '密码不能为空', trigger: 'change'
        }],
        repassword: [{
          required: true, message: '确认密码不能为空', trigger: 'change'
        }, { validator: checkRe, trigger: 'change' }]
      },
      registerLoading: false,
      isRegisterError: false,
      rememberUser: false,
      errorMsg: ''
    }
  },
  methods: {
    register () {
      this.isRegisterError = false
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.registerLoading = true
          window.$api.user.register({
            username: this.registerForm.username.trim(),
            password: md5(this.registerForm.password)
          })
            .then(res => {
              this.registerLoading = false
              this.$message({
                message: res.msg,
                type: 'success'
              })
            }).catch(error => {
              if (error.data) this.errorMsg = error.data.msg
              else this.errorMsg = '网络异常'
              this.registerLoading = false
              this.isRegisterError = true
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.register-box {
  position: absolute;
  top: calc(45% - 164.5px);
  left: calc(75% - 212px);
  width: 424px;
  height: 380px;
  background: #fff;
  border: 1px solid #dcdcdc;
}
.register-head {
  padding: 28px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
  color: #303133;
}
.register-form {
  padding: 0 50px;
}
.loign-submit {
  width: 100%;
  font-size: 16px;
  height: 40px;
}
.register {
  background-image: url("../assets/background.jpg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
</style>
