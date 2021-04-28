<template>
  <div>
    <div class="search">
      <el-button type="primary" icon="el-icon-search" @click="searchByTitle"
        >搜索</el-button
      >
      <el-input v-model="title" placeholder="请输入关键词"></el-input>
    </div>
    <el-table :data="itemsList" stripe style="width: 100%" fit border>
      <el-table-column label="ID" type="index" width="100px"> </el-table-column>
      <el-table-column prop="title" label="标题" min-width="180px">
      </el-table-column>
      <el-table-column prop="auther" label="发布人" width="120px">
      </el-table-column>
      <el-table-column prop="display_time" label="发布时间" width="220px">
      </el-table-column>
      <el-table-column prop="importance" label="Importance" width="110px">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.importance"
            disabled
            :max="3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :low-threshold="1"
            :high-threshold="3"
            style="display: inline-block"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/notice/edit/${scope.row._id}`)"
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
      itemsList: [],
      title: "",
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("notice");
      this.items = res.data;
      this.itemsList = this.items;
    },

    //搜索
    searchByTitle() {
      this.itemsList = this.items.filter((data) =>
        data.title.includes(this.title)
      );
    },

    //处理删除事件
    async remove(row) {
      // console.log("row", row);
      this.$confirm("是否确定要删除该公告信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`notice/${row._id}`);
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

<style lang="scss" scoped>
.search /deep/ {
  margin-bottom: 10px;
  .el-input {
    float: right;
    width: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .el-button {
    float: right;
  }
}
</style>
