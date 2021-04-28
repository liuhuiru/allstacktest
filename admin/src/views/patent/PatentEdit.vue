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
          <el-row>
            <el-col :span="22">
              <el-form-item label="专利名称" prop="name">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="专利类别" prop="category">
                <el-select
                  v-model="model.category"
                  placeholder="请选择"
                  width="200"
                >
                  <el-option
                    v-for="item in categories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="专利号">
                <el-input v-model="model.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发明人">
                <el-input v-model="model.inventor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="专利权人">
                <el-input v-model="model.patentee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item label="授权公告日">
                <el-date-picker
                  v-model="model.announDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="申请日">
                <el-date-picker
                  v-model="model.filingDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="附件">
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
            请上传专利证书电子档(.docx)
          </div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "PatentEdit",
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      fileList: [],
      categories: [
        {
          label: "发明专利",
          value: "发明专利",
        },
        {
          label: "实用新型专利",
          value: "实用新型专利",
        },
        {
          label: "外观设计专利",
          value: "外观设计专利",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入专利 ", trigger: "blur" }],
      },
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`patent/${this.id}`, this.model);
      } else {
        await this.$http.post("patent", this.model);
      }

      this.$router.push("/patent/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个专利人员信息
    async fetch() {
      const res = await this.$http.get(`patent/${this.id}`);
      // console.log("res", res);
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
