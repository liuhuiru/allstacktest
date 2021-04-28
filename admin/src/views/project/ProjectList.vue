<template>
  <div>
    <div class="header">
      <div class="label">
        <el-select v-model="progress" placeholder="请选择">
          <el-option label="未开始" value="未开始"></el-option>
          <el-option label="进行中" value="进行中"></el-option>
          <el-option label="已结项" value="已结项"></el-option>
          <el-option label="--" value=""></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
        <el-input v-model="name" placeholder="项目名称"></el-input>
        <el-input v-model="director" placeholder="项目负责人"></el-input>
      </div>
    </div>
    <el-table
      :data="
        itemsList.filter(
          (data) => !progress || data.progress.includes(progress)
        )
      "
      stripe
      style="width: 100%"
      fit
      border
    >
      <el-table-column prop="name" label="项目名称" min-width="280">
      </el-table-column>
      <el-table-column prop="director" label="项目负责人" width="120">
      </el-table-column>
      <el-table-column prop="funds" label="项目经费" width="120">
      </el-table-column>
      <el-table-column prop="level" label="项目级别" width="120">
      </el-table-column>
      <el-table-column prop="progress" label="项目进度" width="120">
      </el-table-column>
      <el-table-column label="附件" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="download(scope.row)"
            >下载</el-button
          ></template
        >
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="handleCheckClick(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/project/edit/${scope.row._id}`)"
            v-if="isadmin"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="remove(scope.row)"
            v-if="isadmin"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看项目信息弹框 -->
    <el-dialog
      :visible.sync="dialogCheckVisible"
      width="750px"
      title="查看项目信息"
      size="mini"
    >
      <el-form :model="project" label-width="100px" label-position="left">
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称">
              <span class="dialog__checkform-:span">{{ project.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目负责人">
              <span class="dialog__checkform-:span">{{
                project.director
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="项目经费">
              <span class="dialog__checkform-:span">{{ project.funds }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目级别">
              <span class="dialog__checkform-:span">{{ project.level }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="项目类型">
              <span class="dialog__checkform-:span">{{ project.type }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目开始时间">
              <span class="dialog__checkform-:span">{{ start }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="项目结束时间">
              <span class="dialog__checkform-:span">{{ end }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中期考核时间">
              <span class="dialog__checkform-:span">{{ midterm }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="项目组成员">
              <span class="dialog__checkform-:span">{{ project.member }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="项目内容简述">
              <span class="dialog__checkform-:span">{{ project.content }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {
      items: [],
      dialogCheckVisible: false,
      project: {},
      start: "",
      end: "",
      midterm: "",
      isadmin: true,
      itemsList: [],
      progress: "",
      director: "",
      name: "",
    };
  },
  methods: {
    //获取科研人员信息
    async fetch() {
      const res = await this.$http.get("project");
      // console.log("res", res);
      this.items = res.data;
      this.itemsList = this.items;
    },

    //处理搜索事件
    search() {
      this.itemsList = this.items.filter((data) =>
        data.name.includes(this.name)
      );
      this.itemsList = this.itemsList.filter((data) =>
        data.director.includes(this.director)
      );
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

    //处理查看事件
    handleCheckClick(val) {
      this.dialogCheckVisible = true;
      this.project = val;
      this.start = this.moment(this.project.start).format("YYYY-MM-DD");
      this.end = this.moment(this.project.end).format("YYYY-MM-DD");
      this.midterm = this.moment(this.project.midterm).format("YYYY-MM-DD");
    },
    //下载文件
    download(val) {
      let xhr = new XMLHttpRequest();
      let fileName = `${val.name}.docx`; // 文件名称
      xhr.open("GET", val.url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (this.status === 200) {
          let type = xhr.getResponseHeader("Content-Type");

          let blob = new Blob([this.response], { type: type });
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            window.navigator.msSaveBlob(blob, fileName);
          } else {
            let URL = window.URL || window.webkitURL;
            let objectUrl = URL.createObjectURL(blob);
            if (fileName) {
              var a = document.createElement("a");
              // safari doesn't support this yet
              if (typeof a.download === "undefined") {
                window.location = objectUrl;
              } else {
                a.href = objectUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            } else {
              window.location = objectUrl;
            }
          }
        }
      };
      xhr.send();
    },
  },
  created() {
    if (localStorage.role === "researcher") {
      this.isadmin = false;
      console.log(this.isadmin);
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
