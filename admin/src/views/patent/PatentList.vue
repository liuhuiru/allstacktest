<template>
  <div>
    <div class="header">
      <div class="label">
        <el-select v-model="category" placeholder="请选择">
          <el-option label="发明专利" value="发明专利"></el-option>
          <el-option label="实用新型专利" value="实用新型专利"></el-option>
          <el-option label="外观设计专利" value="外观设计专利"></el-option>
          <el-option label="--" value=""></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchByName"
          >搜索</el-button
        >
        <el-input v-model="name" placeholder="专利名称"></el-input>
      </div>
    </div>
    <el-table
      :data="
        itemsList.filter(
          (data) => !category || data.category.includes(category)
        )
      "
      stripe
      style="width: 100%"
      fit
      border
    >
      <el-table-column prop="name" label="专利名称" min-width="300">
      </el-table-column>
      <el-table-column prop="category" label="专利类型" width="120">
      </el-table-column>
      <el-table-column prop="number" label="专利号" width="120">
      </el-table-column>
      <el-table-column prop="inventor" label="发明人" width="120">
      </el-table-column>
      <el-table-column prop="patentee" label="专利权人" width="120">
      </el-table-column>
      <el-table-column label="附件">
        <template slot-scope="scope">
          <el-button type="text" @click="download(scope.row)"
            >下载</el-button
          ></template
        >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
            @click="$router.push(`/patent/edit/${scope.row._id}`)"
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
    <!-- 查看专利信息弹框 -->
    <el-dialog
      :visible.sync="dialogCheckVisible"
      width="750px"
      title="查看专利信息"
      size="mini"
    >
      <el-form :model="patent" label-width="100px" label-position="left">
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="专利名称">
              <span class="dialog__checkform-span">{{ patent.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专利类型">
              <span class="dialog__checkform-span">{{ patent.category }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="专利号">
              <span class="dialog__checkform-span">{{ patent.number }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发明人">
              <span class="dialog__checkform-span">{{ patent.inventor }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="申请日">
              <span class="dialog__checkform-span">{{ filingDate }}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授权公告日">
              <span class="dialog__checkform-span">{{ announDate }}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="专利权人">
              <span class="dialog__checkform-span">{{ patent.patentee }}</span>
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
      patent: {},
      dialogCheckVisible: false,
      isadmin: true,
      filingDate: "",
      announDate: "",
      name: "",
      category: "",
    };
  },
  methods: {
    //获取管理人员信息
    async fetch() {
      const res = await this.$http.get("patent");
      this.items = res.data;
      this.itemsList = this.items;
    },

    //删除
    searchByName() {
      this.itemsList = this.items.filter((data) =>
        data.name.includes(this.name)
      );
    },

    //处理删除事件
    async remove(row) {
      console.log("row", row);
      this.$confirm("是否确定要删除该专利信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`patent/${row._id}`);
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
      this.patent = val;
      this.filingDate = this.moment(this.patent.filingDate).format(
        "YYYY-MM-DD"
      );
      this.announDate = this.moment(this.patent.announDate).format(
        "YYYY-MM-DD"
      );
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
    }
    this.fetch();
  },
};
</script>

<style>
.dialog__header {
  width: 100%;
  background-color: rgba(235, 240, 250, 0.87843137254902);
}
.dialog__checkform-label {
  width: 100px;
}
.dialog__checkform-:span {
  color: black;
}
</style>
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