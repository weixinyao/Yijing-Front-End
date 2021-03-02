import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/managerlogin',
    name: 'managerlogin',
    component: () => import('@/views/Managerlogin.vue')
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('@/views/classify.vue')
  },
  {
    path: '/homesearch',
    name: 'homesearch',
    component: () => import('@/views/HomeSearch.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/Help.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/Feedback.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/Collect.vue')
  },
  {
    path: '/personalmessage',
    name: 'personalmessage',
    component: () => import('@/views/Personalmessage.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('@/views/Manager.vue')
  },
  {
    path: '/gooddetail/:id',
    name: 'gooddetail',
    component: () => import('@/views/picpreview.vue')
  },
  {
    path: '/uploadgood',
    name: 'uploadgood',
    component: () => import('@/views/uploadgood.vue')
  },
  {
    path: '/writecomment/:id',
    name: 'writecomment',
    component: () => import('@/views/WriteComment.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/Collect.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('@/views/Publish.vue')
  },
  {
    path: "/ordersuccess",
    name: "ordersuccess",
    component: () => import('@/views/Ordersuccess.vue')
  },
  {
    path: '/downgood',
    name: 'downgood',
    component: () => import('@/views/Downgood.vue')
  },
  {
    path: '/analyseorder',
    name: 'analyseorder',
    component: () => import('@/views/Analyseorder.vue')
  },
  {
    path: '/idpicture',
    name: 'idpicture',
    component: () => import('@/views/Idpicture.vue')
  },
  {
    path: '/goodarg',
    name: 'goodarg',
    component: () => import('@/views/goodarg.vue')
  },
  {
    path: '/addmoney',
    name: 'addmoney',
    component: () => import('@/views/Addmoney.vue')
  },
  {
    path: '/shenhegooddetail/:id',
    name: 'shenhegooddetail',
    component: () => import('@/views/Shenhegooddetail.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
