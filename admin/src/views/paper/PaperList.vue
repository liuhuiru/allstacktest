<template >
  <div>
    <div class="header">
      <div class="label">
        <el-select v-model="category" placeholder="请选择">
          <el-option label="学术论文" value="学术论文"></el-option>
          <el-option label="学位论文" value="学位论文"></el-option>
          <el-option label="--" value=""></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchByTitle"
          >搜索</el-button
        >
        <el-input v-model="title" placeholder="请输入论文标题关键字"></el-input>
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
      list
    >
      <el-table-column prop="title" label="论文标题" width="200">
      </el-table-column>
      <el-table-column prop="leadAuther" label="第一作者" width="120">
      </el-table-column>
      <el-table-column prop="corresAuther" label="通讯作者"> </el-table-column>
      <el-table-column prop="journal" label="发表期刊"> </el-table-column>
      <el-table-column prop="display_time" label="发表时间"> </el-table-column>
      <el-table-column prop="keyword" label="关键字"> </el-table-column>
      <el-table-column label="论文电子档">
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
            @click="$router.push(`/paper/edit/${scope.row._id}`)"
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
    <!-- 查看论文信息弹框 -->
    <el-dialog
      :visible.sync="dialogCheckVisible"
      width="750px"
      title="查看论文信息"
      size="mini"
    >
      <el-form :model="paper" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="20">
            <el-form-item label="论文名称">
              <span class="dialog__checkform-span">{{ paper.title }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="论文类型">
              <span class="dialog__checkform-span">{{ paper.category }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发表时间">
              <span class="dialog__checkform-span">{{
                paper.display_time
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="第一作者">
              <span class="dialog__checkform-span">{{ paper.leadAuther }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位">
              <span class="dialog__checkform-span">{{ paper.laUnit }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="通讯作者">
              <span class="dialog__checkform-span">{{
                paper.corresAuther
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位">
              <span class="dialog__checkform-span">{{ paper.caUnit }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="全部作者">
              <span class="dialog__checkform-span">{{ paper.auther }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="引用">
              <span class="dialog__checkform-span">{{ paper.level }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="关键词">
              <span class="dialog__checkform-span">{{ paper.keyword }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发表期刊">
              <span class="dialog__checkform-span">{{ paper.journal }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="12">
            <el-form-item label="期刊号">
              <span class="dialog__checkform-span">{{ paper.issn }}</span>
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
      paper: {},
      dialogCheckVisible: false,
      isadmin: true,
      category: "",
      title: "",
      itemsList: [],
    };
  },
  methods: {
    //获取论文信息
    async fetch() {
      const res = await this.$http.get("paper");
      this.items = res.data;
      this.itemsList = this.items;
    },

    //处理搜索事件
    searchByTitle() {
      this.itemsList = this.items.filter((data) =>
        data.title.includes(this.title)
      );
    },

    //处理删除事件
    async remove(row) {
      // console.log("row", row);
      this.$confirm("是否确定要删除该论文信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`paper/${row._id}`);
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
      this.paper = val;
    },
    //下载文件
    download(val) {
      let xhr = new XMLHttpRequest();
      let fileName = `${val.title}.docx`; // 文件名称
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
      this.admin = false;
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
.dialog__checkform-span {
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


