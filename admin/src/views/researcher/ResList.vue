<template>
  <div>
    <div class="header">
      <div class="label">
        <el-select v-model="title" placeholder="请选择">
          <el-option label="讲师" value="讲师"></el-option>
          <el-option label="副教授" value="副教授"></el-option>
          <el-option label="教授" value="教授"></el-option>
          <el-option label="(学生)" value="学生"></el-option>
          <el-option label="--" value=""></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchByName"
          >搜索</el-button
        >
        <el-input v-model="name" placeholder="请输入搜索人姓名"></el-input>
      </div>
    </div>
    <el-table
      :data="itemsList.filter((data) => !title || data.title.includes(title))"
      stripe
      style="width: 100%"
      fit
      border
    >
      <el-table-column prop="username" label="学号/工号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="degree" label="最后学位" width="200">
      </el-table-column>
      <el-table-column prop="institution" label="所属单位"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/researcher/edit/${scope.row._id}`)"
            :v-if="isadmin"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="remove(scope.row)"
            :v-if="isadmin"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看论文信息弹框 -->
    <el-dialog
      :visible.sync="dialogCheckVisible"
      width="750px"
      title="查看论文信息"
      size="mini"
    >
      <el-form :model="researcher" label-width="100px" label-position="left">
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="工号/学号">
              <span class="dialog__checkform-span">{{
                researcher.username
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <span class="dialog__checkform-span">{{ researcher.name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄">
              <span class="dialog__checkform-span">{{ researcher.age }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <span class="dialog__checkform-span">{{
                researcher.gender
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱">
              <span class="dialog__checkform-span">{{ researcher.email }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后学位">
              <span class="dialog__checkform-span">{{
                researcher.degree
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="职称">
              <span class="dialog__checkform-span">{{ researcher.title }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位">
              <span class="dialog__checkform-span">{{
                researcher.institution
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="研究方向">
              <span class="dialog__checkform-span">{{
                researcher.direction
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      itemsList: [],
      researcher: {},
      dialogCheckVisible: false,
      title: "",
      name: "",
      isadmin: true,
    };
  },
  methods: {
    //获取科研人员信息
    async fetch() {
      const res = await this.$http.get("researcher");
      // console.log("res", res);
      this.items = res.data;
      this.itemsList = this.items;
    },

    //处理搜索事件
    searchByName() {
      this.itemsList = this.items.filter((data) =>
        data.name.includes(this.name)
      );
    },

    //处理查看事件
    handleCheck(val) {
      this.dialogCheckVisible = true;
      this.researcher = val;
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
    if (localStorage.role === "researcher") {
      this.admin = false;
    }
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.header {
  .label {
    float: left;
    margin-bottom: 10px;
  }
  .search /deep/ {
    margin-bottom: 10px;
    .el-input {
      float: right;
      width: 200px;
      margin-right: 10px;
    }
    .el-button {
      float: right;
    }
  }
}
</style>
