<template>
  <div>
    <el-card class="box-card">
      <div class="res_title">{{ id ? "编辑" : "新建" }}管理人员</div>
    </el-card>
    <el-card>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="model.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="model.password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="">
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
      model: {},
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("admin_users", this.model);
      }

      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个科研人员信息
    async fetch() {
      const res = await this.$http.get(`admin_users/${this.id}`);
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
</style>