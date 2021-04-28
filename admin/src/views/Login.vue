<template>
  <div class="login-container">
    <el-form
      @submit.native.prevent="login"
      :model="model"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">课题组科研工作管理平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container"> <i class="el-icon-user"></i> </span>
        <el-input
          v-model="model.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container"> <i class="el-icon-lock"></i> </span>
        <el-input
          v-model="model.password"
          :key="passwordType"
          ref="password"
          type="password"
          placeholder="请输入6位密码"
          name="password"
          tabindex="2"
        >
        </el-input>
      </el-form-item>

      <el-radio-group
        v-model="model.role"
        style="margin-bottom: 20px; color: #fff !important"
      >
        <el-radio label="researcher"></el-radio>
        <el-radio label="admin"></el-radio>
      </el-radio-group>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="width: 100%"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        role: "",
      },
      loginRules: {
        username: [{ require: true, trigger: "blur" }],
        password: [
          { required: true, message: "请输入6位密码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位密码" },
        ],
      },
      passwordType: "password",
    };
  },
  methods: {
    async login() {
      console.log(this.model.role);
      if (this.model.role === "") {
        this.$message("请先选择身份");
      } else {
        const res = await this.$http.post("login", this.model);
        localStorage.token = res.data.token;
        localStorage.role = res.data.role;
        localStorage.id = res.data.id;
        if (localStorage.role === "admin") {
          this.$router.push("/");
        } else {
          this.$router.push("/res");
        }
        this.$message({
          type: "success",
          message: "登录成功",
        });
      }
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
    }
  }
  .el-radio {
    color: #fff;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 587px;
  background-color: $bg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 19px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
