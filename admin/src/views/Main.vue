<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(48, 65, 86)">
      <el-menu
        router
        :default-active="$router.path"
        background-color="rgb(48,65,86)"
        text-color="rgb(191,203,217)"
        active-text-color="#fff"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>科研管理</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-s-claim"></i><span>项目管理</span></template
            >
            <el-menu-item index="/project/create">新建项目</el-menu-item>
            <el-menu-item index="/project/list">项目列表</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title"
              ><i class="el-icon-notebook-2"></i><span>成果管理</span></template
            >
            <el-menu-item-group>
              <template slot="title">论文管理</template>
              <el-menu-item index="/paper/create">新建论文</el-menu-item>
              <el-menu-item index="/paper/list">论文列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">专利管理</template>
              <el-menu-item index="/patent/create">新建专利</el-menu-item>
              <el-menu-item index="/patent/list">专利列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-user-solid"></i><span>成员管理</span></template
          >
          <el-menu-item-group>
            <template slot="title">科研人员</template>
            <el-menu-item index="/researcher/create">新建科研员</el-menu-item>
            <el-menu-item index="/researcher/list">科研员列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理人员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span>通知公告</span>
          </template>
          <el-menu-item index="/notice/create">新建公告</el-menu-item>
          <el-menu-item index="/notice/list">通知列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height: 50px">
        <div class="title">科研管理系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main style="background-color: rgb(238, 241, 246)">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
::v-deep.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}
::v-deep.el-menu-item:hover {
  background: rgb(38, 52, 69) !important;
}

.title {
  float: left;
  font-size: 32px;
  color: #333;
  font-weight: bold;
  margin-top: 6px;
  font-family: "Courier New", Courier, monospace;
}
</style>
<style >
.el-menu {
  width: 200px;
}

.el-submenu__title:hover {
  background: rgb(38, 52, 69) !important;
}
</style>

<script>
export default {};
</script>