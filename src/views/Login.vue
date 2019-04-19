<template>
  <div
    class="login-box"
    @keyup-enter="login"
  >
    <div class="login-head">用户登录</div>
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      class="login-form"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.usernmae"
          placeholder="账户"
        >
          <template slot="prepend">
            <i class="fa fa-user">

            </i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
        >
          <template slot="prepend">
            <i class="fa fa-lock">

            </i>
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
        <router-link
          to='register'
          style="margin-left:140px"
        >用户注册</router-link>
        <el-button
          class="loign-submit"
          type="primary"
          @click="login"
          :loading="loginLoading"
        >{{loginLoading?'登录中...':'登录'}}</el-button>
        <span
          v-if="isLoginError"
          class="el-form-item_errors"
        ></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {},
      loginRules: {},
      loginLoading: false,
      isLoginError: false
    };
  },
  methods: {
    login() {
      console.log();
    }
  }
};
</script>
<style scoped>
.login-box {
  position: absolute;
  top: calc(45% - 164.5px);
  left: calc(75% - 212px);
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
</style>
