import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import ResEdit from '../views/ResEdit.vue'
import ResList from '../views/ResList.vue'
import AdminEdit from '../views/AdminEdit.vue'
import AdminList from '../views/AdminList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
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
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
