<template>
  <div class="usersetting">
    <el-tabs tab-position="left" style="height: 100%" stretch="false">
      <el-tab-pane label="基本设置">
        <div class="title">基本设置</div>
        <el-container>
          <el-aside width="180px">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div style="padding-left: 62px">头像</div>
          </el-aside>
          <el-main>
            <el-form
              label-width="100px"
              label-position="left"
              @submit.native.prevent="save"
            >
              <el-form-item label="姓名">
                <el-input v-model="model.name" disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-select v-model="model.gender" placeholder="请选择">
                  <el-option label="男" value="male"></el-option>
                  <el-option label="女" value="female"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model.number="model.age"></el-input>
              </el-form-item>

              <el-form-item label="邮箱">
                <el-input v-model="model.email"></el-input>
              </el-form-item>

              <el-form-item label="最后学位">
                <el-input v-model="model.degree"></el-input>
              </el-form-item>

              <el-form-item label="职称">
                <el-input v-model="model.title"></el-input>
              </el-form-item>

              <el-form-item label="单位名称">
                <el-input v-model="model.institution"></el-input>
              </el-form-item>
              <el-form-item label="研究方向">
                <el-input v-model="model.direction" type="textarea"></el-input>
              </el-form-item>

              <el-form-item style="margin-left: 300px">
                <el-button type="primary" native-type="submit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <div class="title">安全设置</div>
        <el-form
          label-width="100px"
          label-position="left"
          @submit.native.prevent="changePassword"
          style="margin-left: 20px; margin-top: 20px"
        >
          <el-form-item label="工号/学号">
            <el-input v-model="model.username" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="model.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 200px">
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      password: "",
    };
  },
  methods: {
    //修改基本信息
    async save() {
      const id = localStorage.id;
      await this.$http.put(`researcher/${id}`, this.model);

      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个科研人员信息
    async fetch() {
      const id = localStorage.id;
      const res = await this.$http.get(`researcher/${id}`);
      // console.log("res", res);
      this.model = res.data;
    },
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //修改密码
    async changePassword() {
      if (this.model.password !== this.password) {
        this.$message.error("两次输入的密码不匹配，请重新输入!");
      } else {
        this.save();
      }
    },
  },

  created() {
    this.fetch();
  },
};
</script>

<style scoped lang="scss">
.usersetting /deep/ {
  background-color: #fff;
  padding-top: 20px;
  .title {
    font-size: 18px;
    margin-left: 20px;
  }
  .el-tabs__header {
    height: 300px;
  }
  .el-tabs__item {
    width: 170px;
    line-height: 40px;
    font-family: "Courier New", Courier, monospace;
    font-size: 18px;
  }
  .el-aside {
    margin-left: 20px;
    margin-top: 20px;
  }
  .el-input {
    width: 300px;
  }
  .el-textarea {
    width: 300px;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
</style>
