import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import ProjectEdit from '../views/ProjectEdit.vue'
import ProjectList from '../views/ProjectList.vue'
import PaperEdit from '../views/PaperEdit.vue'
import PaperList from '../views/PaperList.vue'
import PatentEdit from '../views/PatentEdit.vue'
import PatentList from '../views/PatentList.vue'
import ResEdit from '../views/ResEdit.vue'
import ResList from '../views/ResList.vue'
import AdminEdit from '../views/AdminEdit.vue'
import AdminList from '../views/AdminList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/project/create',
        component: ProjectEdit
      },
      {
        path: '/project/list',
        component: ProjectList
      },
      {
        path: '/project/edit/:id',
        component: ProjectEdit,
        props: true
      },
      {
        path: '/paper/create',
        component: PaperEdit
      },
      {
        path: '/paper/list',
        component: PaperList
      },
      {
        path: '/patent/create',
        component: PatentEdit
      },
      {
        path: '/patent/list',
        component: PatentList
      },
      {
        path: '/researcher/create',
        component: ResEdit
      },
      {
        path: '/researcher/list',
        component: ResList
      },
      {
        path: '/researcher/edit/:id',
        component: ResEdit,
        props: true
      },
      {
        path: '/admin_users/create',
        component: AdminEdit
      },
      {
        path: '/admin_users/list',
        component: AdminList
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminEdit,
        props: true
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

//前端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
