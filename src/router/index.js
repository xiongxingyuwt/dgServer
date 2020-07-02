import Vue from 'vue'
import VueRouter from 'vue-router'
import userlist from '../components/pages/userllist'
import workslist from '../components/pages/works'
import olderlist from '../components/pages/older'
import adminlist from '../components/pages/admin'
import adminlogin from '../components/pages/login'
import admin from '../components/backstoreApp'
import register from '../components/pages/regist'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: (to)=>{
        return "/loginManage"
      }
    },
    {
      path: '/admin',
      component: admin,
      redirect: (to)=>{
        return "/userManage"
      },
      children: [
          {
            path: '/worksManage',
            component: workslist
          },
          {
            path: '/olderManage',
            component: olderlist
          },
          {
            path: '/manageManage',
            component: adminlist
          },
          {
            path: '/userManage',
            component: userlist
          }
      ]
    },
    {
      path: '/loginManage',
      component: adminlogin
    },
    {
      path: '/registManage',
      component: register
    }
  ],
  mode: 'history'
})

export default router
