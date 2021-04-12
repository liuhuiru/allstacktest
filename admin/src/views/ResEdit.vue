<template>
  <div>
    <el-card class="box-card">
      <div class="res_title">{{ id ? "编辑" : "新建" }}科研人员</div>
    </el-card>
    <el-card>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="用户名">
              <el-input v-model="model.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码">
              <el-input v-model="model.password" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别">
              <el-select v-model="model.gender" placeholder="请选择">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="年龄">
              <el-input v-model.number="model.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮箱">
              <el-input v-model="model.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="最后学位">
              <el-input v-model="model.degree"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="研究方向">
              <el-input v-model="model.direction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="职称">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="单位名称">
              <el-input v-model="model.institution"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-left: 625px">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        password: "123456",
      },
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`researcher/${this.id}`, this.model);
      } else {
        await this.$http.post("researcher", this.model);
      }

      this.$router.push("/researcher/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个科研人员信息
    async fetch() {
      const res = await this.$http.get(`researcher/${this.id}`);
      console.log("res", res);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
.box-card .el-card__body {
  height: 26px;
  padding: 10px;
}
.res_title {
  font-size: 18px;
}
</style>