<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="model"
      class="form-container"
      @submit.native.prevent="save"
    >
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput
                v-model="model.title"
                :maxlength="100"
                name="name"
                required
              >
                题目
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label-width="60px"
                    label="发布者:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="model.auther"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label-width="120px"
                    label="发布时间:"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="model.time"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="90px"
                    label="Importance:"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="model.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display: inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px">
          <vue-editor
            v-model="model.content"
            useCustomImageHandler
            @image-added="handleImageAdded"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="float: right"
            >发布</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    MDinput,
    VueEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      rules: [],
      display: "",
      time: "",
    };
  },
  methods: {
    async save() {
      this.time = this.moment(this.model.time).format("YYYY-MM-DD");
      // console.log(this.time);
      this.$set(this.model, "display_time", this.time);
      // console.log(this.model.display_time);
      if (this.id) {
        await this.$http.put(`notice/${this.id}`, this.model);
      } else {
        await this.$http.post("notice", this.model);
      }

      this.$router.push("/notice/list");
      this.$message({
        type: "success",
        message: "发布成功",
      });
    },

    //根据id获取某个通知信息
    async fetch() {
      const res = await this.$http.get(`notice/${this.id}`);
      this.model = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);

      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  created() {
    this.id && this.fetch();
  },
  watched: {
    displayTime() {
      this.model.display_time = this.$moment(this.displayTime).format(
        "yyyy-MM-dd HH:mm:ss"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.createPost-container {
  position: relative;
  background: #fff;

  .createPost-main-container {
    padding: 10px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>