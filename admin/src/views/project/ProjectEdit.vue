<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form
          :model="model"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          @submit.native.prevent="save"
        >
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目负责人" prop="director">
                <el-input v-model="model.director"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="项目级别" prop="name">
                <el-select v-model="model.level" placeholder="请选择项目级别">
                  <el-option label="国家级" value="国家级"></el-option>
                  <el-option label="省部级" value="省部级"></el-option>
                  <el-option label="地厅级" value="地厅级"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目类型">
                <el-select v-model="model.type" placeholder="请选择项目类型">
                  <el-option label="重大" value="重大"></el-option>
                  <el-option label="重点" value="重点"></el-option>
                  <el-option label="一般" value="一般"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="项目进度">
                <el-select
                  v-model="model.progress"
                  placeholder="请选择项目类型"
                >
                  <el-option label="未开始" value="未开始"></el-option>
                  <el-option label="进行中" value="进行中"></el-option>
                  <el-option label="已结项" value="已结项"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="中期检查时间">
                <el-date-picker
                  v-model="model.midterm"
                  type="date"
                  placeholder="请选择中期检查时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="项目经费" props="funds">
                <el-input v-model="model.funds"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目组成员">
                <el-input v-model="model.member"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="model.start"
                  type="date"
                  placeholder="请选择研究开始日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="model.end"
                  type="date"
                  placeholder="请选择研究结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item label="内容简述">
                <el-input
                  type="textarea"
                  height="500px"
                  placeholder="请简述项目内容"
                  v-model="model.content"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文档上传">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="$http.defaults.baseURL + '/upload'"
          :file-list="fileList"
          :auto-upload="false"
          :on-success="afterUpload"
          accept=".docx"
          limit="1"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            请上传立项申请书（未结项）或结项报告（已结项）,仅接受docx类型文档
          </div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ProjectEdit",
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
        await this.$http.put(`project/${this.id}`, this.model);
      } else {
        await this.$http.post("project", this.model);
      }

      this.$router.push("/project/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个科研人员信息
    async fetch() {
      const res = await this.$http.get(`project/${this.id}`);
      this.model = res.data;
    },
    submitUpload() {
      this.model.url = this.$refs.upload.submit();
    },
    afterUpload(res) {
      this.$set(this.model, "url", res.url);
      this.save();
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style scoped>
</style>
