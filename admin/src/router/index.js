import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import MainRes from '../views/MainRes.vue'
import ProjectEdit from '../views/project/ProjectEdit.vue'
import ProjectList from '../views/project/ProjectList.vue'
import PaperEdit from '../views/paper/PaperEdit.vue'
import PaperList from '../views/paper/PaperList.vue'
import PatentEdit from '../views/patent/PatentEdit.vue'
import PatentList from '../views/patent/PatentList.vue'
import ResEdit from '../views/researcher/ResEdit.vue'
import ResList from '../views/researcher/ResList.vue'
import AdminEdit from '../views/admin/AdminEdit.vue'
import AdminList from '../views/admin/AdminList.vue'
import Userpage from '../views/usercenter/userpage.vue'
import UserSetting from '../views/usercenter/usersetting.vue'
import NoticeEdit from '../views/notice/NoticeEdit.vue'
import NoticeList from '../views/notice/NoticeList.vue'
import Dashboard from '../views/Dashboard.vue'
import Test from '../views/test.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false
    }
  },

  {
    path: '/res',
    name: 'MainRes',
    component: MainRes,
    children: [
      {
        path: '/res/userpage',
        component: Userpage,
        props: true,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/usersetting',
        component: UserSetting,
        props: true,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/project',
        component: ProjectList,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/paper',
        component: PaperList,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/patent',
        component: PatentList,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/researcher',
        component: ResList,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
    ]
  },

  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/project/create',
        component: ProjectEdit,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/project/list',
        component: ProjectList,
        meta: { requireAuth: true, roles: ['admin', 'researcher'] }
      },
      {
        path: '/project/edit/:id',
        component: ProjectEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },

      {
        path: '/paper/create',
        component: PaperEdit,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/paper/list',
        component: PaperList,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/paper/edit/:id',
        component: PaperEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },

      {
        path: '/patent/create',
        component: PatentEdit,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/patent/list',
        component: PatentList,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/patent/edit/:id',
        component: PatentEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },

      {
        path: '/researcher/create',
        component: ResEdit,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/researcher/list',
        component: ResList,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/researcher/edit/:id',
        component: ResEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },

      {
        path: '/admin_users/create',
        component: AdminEdit,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/admin_users/list',
        component: AdminList,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/res/userpage',
        component: Userpage,
        props: true,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/res/usersetting',
        component: UserSetting,
        props: true,
        meta: { requireAuth: true, roles: ['researcher'] }
      },
      {
        path: '/notice/create',
        component: NoticeEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/notice/list',
        component: NoticeList,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/notice/edit/:id',
        component: NoticeEdit,
        props: true,
        meta: { requireAuth: true, roles: ['admin'] }
      },
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/test',
        component: Test
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

// 前端路由限制
// router.beforeEach((to, from, next) => {
//   let userToken = localStorage.token
//   let role = localStorage.role
//   if (to.meta.requireAuth) {
//     if (userToken) {
//       // for (let i = 0; i < to.meta.roles.length; i++) {
//       //   if (role === to.meta.roles[i]) {
//       //     next()
//       //     break
//       //   }
//       // }
//       if (role === to.meta.roles[0] || role === to.meta.roles[1]) {
//         next()
//       }
//       else {
//         next('/login')
//       }
//     }
//     else {
//       next('/login')
//     }
//   }
//   next()
// })
export default router
