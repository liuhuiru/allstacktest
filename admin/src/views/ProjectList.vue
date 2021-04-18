<template>
  <div>
    <el-table :data="items" stripe style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="200">
      </el-table-column>
      <el-table-column prop="director" label="项目负责人" width="120">
      </el-table-column>
      <el-table-column prop="funds" label="项目经费" width="120">
      </el-table-column>
      <el-table-column prop="level" label="项目级别" width="120">
      </el-table-column>
      <el-table-column prop="type" label="项目类型" width="120">
      </el-table-column>
      <el-table-column prop="progress" label="项目进度" width="120">
      </el-table-column>
      <el-table-column prop="start" label="研究开始时间" width="120">
      </el-table-column>
      <el-table-column prop="end" label="研究结束时间" width="120">
      </el-table-column>
      <el-table-column prop="midterm" label="中期考核时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/project/edit/${scope.row._id}`)"
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
  name: "ProjectList",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    //获取科研人员信息
    async fetch() {
      const res = await this.$http.get("project");
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
          this.$http.delete(`project/${row._id}`);
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
