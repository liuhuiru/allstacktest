  \<template>
  <div>
    <el-table :data="items" stripe style="width: 100%">
      <el-table-column prop="_id" label="ID" width=""> </el-table-column>
      <el-table-column prop="username" label="用户名" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    //获取管理人员信息
    async fetch() {
      const res = await this.$http.get("admin_users");
      this.items = res.data;
    },
    //处理删除事件
    async remove(row) {
      console.log("row", row);
      this.$confirm("是否确定要删除该管理员信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`admin_users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>
