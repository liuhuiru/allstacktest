<template >
  <div>
    <el-table
    :data="item"
    stripe
    style="width: 100%">
    <el-table-column
      prop="title"
      label="论文标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="name"
      label="第一作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="leadAuther"
      label="单位">
    </el-table-column>
    <el-table-column
      prop="corresAuther"
      label="通讯作者">
    </el-table-column>
    <el-table-column
      prop="leadAuther"
      label="单位">
    </el-table-column>
    <el-table-column
      prop="journal"
      label="刊物/论文集名称">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发表时间">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default ({
  name: 'PaperList',
  data(){
    return {
      item:[]
    }
  }
});
</script>

<style scoped>

</style>

