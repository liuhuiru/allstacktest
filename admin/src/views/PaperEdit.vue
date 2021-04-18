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
              <el-form-item label="论文标题" prop="name">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文类别" prop="category">
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
              <el-form-item label="论文发表时间">
                <el-date-picker
                  v-model="model.time"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="第一作者">
                <el-input v-model="model.leadAuther"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位">
                <el-input v-model="model.laUnit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="通讯作者">
                <el-input v-model="model.corresAuther"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位">
                <el-input v-model="model.caUnit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="全部作者">
                <el-input
                  type="textarea"
                  height="350"
                  placeholder="请输入全部作者,用'、'间隔"
                  v-model="model.auther"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col span="11">
              <el-form-item label="论文收录">
                <el-select
                  v-model="model.cite"
                  placeholder="请选择"
                  width="200"
                >
                  <el-option
                    v-for="item in cites"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="出版社/主办单位">
                <el-input v-model="model.publisher"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文/刊物集名称">
                <el-input v-model="model.journal"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="期刊号（ISSN号）">
                <el-input v-model="model.issn"></el-input>
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
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
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
          <div slot="tip" class="el-upload__tip">请上传论文的电子版</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "PaperEdit",
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      fileList: [],
      categories: [
        {
          label: "专题型",
          value: "理论性",
        },
        {
          label: "论辩型",
          value: "论辩型",
        },
        {
          label: "综述型",
          value: "综述型",
        },
        {
          label: "综合型",
          value: "综合型",
        },
      ],
      types: [
        {
          label: "学位论文",
          value: "学位论文",
        },
        {
          label: "学术论文",
          value: "学术论文",
        },
      ],
      cites: [
        {
          label: "SCI",
          value: "SCI",
        },
        {
          label: "Ei",
          value: "Ei",
        },
        {
          label: "ISTP",
          value: "ISTP",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入论文标题", trigger: "blur" }],
      },
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`paper/${this.id}`, this.model);
      } else {
        await this.$http.post("paper", this.model);
      }

      this.$router.push("/paper/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    //根据id获取某个科研人员信息
    async fetch() {
      const res = await this.$http.get(`paper/${this.id}`);
      // console.log("res", res);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style scoped>
</style>
