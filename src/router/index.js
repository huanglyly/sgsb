import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('../views/create/index.vue')
      },


    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
