<template>
  <div class="app-content">
    <div class="Tinymce_box">
      <tinymce v-model="content" :height="400" :width="1000"/>
      <div v-if="content" class="editor-content">
        <h3>预览效果：</h3>
        <div v-html="content" />
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      content: ""
    };
  }
};
</script>
<style lang="scss"  scoped>
.Tinymce_box {
  display: flex;
}
.editor-content {
  margin-left: 30px;
  flex-grow: 1;
  border: 2px dashed #f1f1f1;
  padding:0 20px;
}
h3 {
  color: #808080;
}
</style>