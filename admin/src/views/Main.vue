<template>
  <el-container style="height: 100vh">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router :default-active="$router.path">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>成员管理</template
            >
            <el-menu-item-group>
              <template slot="title">科研人员</template>
              <el-menu-item index="/researcher/create">新建科研员</el-menu-item>
              <el-menu-item index="/researcher/list">科研员列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理人员</template>
              <el-menu-item index="/admin_users/create"
                >新建管理员</el-menu-item
              >
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="background-color: rgb(238, 241, 246)">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-main {
  padding: 10px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {};
</script>