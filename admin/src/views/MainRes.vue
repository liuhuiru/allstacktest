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
            <span>科研天地</span>
          </template>
          <el-menu-item index="/res/project">
            <template slot="title">
              <i class="el-icon-s-claim"></i
              ><span>课题组项目汇总</span></template
            >
          </el-menu-item>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-notebook-2"></i
              ><span>课题组成果汇总</span></template
            >
            <el-menu-item index="/res/paper">科研论文</el-menu-item>
            <el-menu-item index="/res/patent">科研专利 </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/res/memeber">
          <template slot="title"
            ><i class="el-icon-user-solid"></i><span>课题组成员</span></template
          ></el-menu-item
        >
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span>个人页</span>
          </template>
          <el-menu-item index="/res/userpage">个人中心</el-menu-item>
          <el-menu-item index="/res/usersetting">个人设置</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height: 50px">
        <div class="title">科研管理系统</div>
        <div class="headerLeft">
          <div
            style="padding: 10px; color: #333; magin-right: 10px; float: left"
          >
            欢迎登陆！{{ this.model.name }}
          </div>
          <el-dropdown>
            <el-avatar :src="this.model.avatar"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-user"
                @click.native="$router.push(`/res/userpage`)"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-setting"
                @click.native="$router.push(`/res/usersetting`)"
                >个人设置</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-switch-button"
                @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="background-color: rgb(238, 241, 246)">
        <router-view :key="$route.path"></router-view>
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
.headerLeft {
  margin-top: 6px;
  margin-left: 20px;
  float: right;
}
</style>
<style >
.el-menu {
  width: 200px;
  border: 0px;
}

.el-submenu__title:hover {
  background: rgb(38, 52, 69) !important;
}
</style>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    async fetch() {
      const id = localStorage.id;
      // console.log(id);
      const res = await this.$http.get(`researcher/${id}`);
      // console.log("res", res);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>