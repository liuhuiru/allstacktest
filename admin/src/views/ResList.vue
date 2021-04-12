<template>
  <div>
    <el-table :data="items" stripe style="width: 100%">
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
      <el-table-column prop="gender" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="degree" label="最后学位" width="200">
      </el-table-column>
      <el-table-column prop="direction" label="研究方向" width="200">
      </el-table-column>
      <el-table-column prop="title" label="职称" width="180"> </el-table-column>
      <el-table-column prop="institution" label="所属单位" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/researcher/edit/${scope.row._id}`)"
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
    //获取科研人员信息
    async fetch() {
      const res = await this.$http.get("researcher");
      // console.log("res", res);
      this.items = res.data;
    },
    //处理删除事件
    async remove(row) {
      console.log("row", row);
      this.$confirm("是否确定要删除该成员信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`researcher/${row._id}`);
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
