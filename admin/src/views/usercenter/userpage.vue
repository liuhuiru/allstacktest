<template>
  <div class="user">
    <el-container style="height: 100%">
      <el-aside
        width="300px"
        style="background-color: #fff; margin-right: 10px"
      >
        <el-avatar :src="model.avatar"></el-avatar>
        <div class="name">{{ model.name }}</div>
        <div class="profile">
          <el-form label-position="left" label-width="80px" :model="model">
            <el-form-item label="工号/学号">
              <div>{{ model.username }}</div>
            </el-form-item>
            <el-form-item label="性别">
              <div>{{ model.gender }}</div>
            </el-form-item>
            <el-form-item label="年龄">
              <div>{{ model.age }}岁</div>
            </el-form-item>
            <el-form-item label="职称">
              <div>{{ model.title }}</div>
            </el-form-item>
            <el-form-item label="所属单位">
              <div>{{ model.institution }}</div>
            </el-form-item>
            <el-form-item label="最后学历">
              <div>{{ model.degree }}</div>
            </el-form-item>
            <el-form-item label="研究方向">
              <div>{{ model.direction }}</div>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>

      <el-main style="background-color: #fff; height: 100%">
        <div class="title">消息列表</div>
        <el-divider></el-divider>
        <el-table
          :data="items.filter((data) => !search || data.title.includes(search))"
          style="width: 100%"
        >
          <el-table-column label="发布时间" prop="display_time">
          </el-table-column>
          <el-table-column label="标题" prop="title"> </el-table-column>
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
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <span>{{ scope.row }}</span>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handlecheck(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看论文信息弹框 -->
        <el-dialog
          :visible.sync="dialogCheckVisible"
          width="750px"
          title="公告信息"
          size="mini"
        >
          <el-form :model="notice" label-width="100px" label-position="left">
            <el-form-item label="标题">
              <span class="dialog__checkform-span">{{ notice.title }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span class="dialog__checkform-span">{{
                notice.display_time
              }}</span>
            </el-form-item>
            <el-form-item label="发布人">
              <span class="dialog__checkform-span">{{ notice.auther }}</span>
            </el-form-item>
            <el-form-item label="具体内容">
              <span
                class="dialog__checkform-span"
                v-html="notice.content"
              ></span>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      items: [],
      search: "",
      dialogCheckVisible: false,
      notice: {},
    };
  },
  methods: {
    async fetch() {
      const id = localStorage.id;
      // console.log(id);
      const res = await this.$http.get(`researcher/${id}`);
      // console.log("res", res);
      this.model = res.data;
      const res2 = await this.$http.get("notice");
      this.items = res2.data;
    },
    handlecheck(val) {
      this.dialogCheckVisible = true;
      this.notice = val;
    },
  },
  created() {
    this.fetch();
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.user /deep/ {
  .el-avatar {
    margin: 20px auto;
    width: 140px;
    height: 140px;
    display: block;
  }
  .name {
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    margin: 0, 10px, 0, 10px;
  }
  .profile /deep/ {
    margin: 20px, auto, 20px, auto;
    .el-form-item {
      margin-left: 25px;
      margin-bottom: 0;
    }
    .title {
      font-size: 20px;
    }
  }
  .dialog__checkform-span {
    color: black;
  }
}
</style>