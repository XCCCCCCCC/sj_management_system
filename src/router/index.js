import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/target/member',
  },
  {
    path: '/target',
    name: 'target',
    redirect: '/target/member',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "target" */ '../views/target/index.vue'),
    children: [
      {
        path: 'member',
        name: 'targetMember',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "targetMember" */ '../views/target/member.vue'),
      },
      {
        path: 'app',
        name: 'targetApp',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "targetApp" */ '../views/target/app.vue'),
      },
    ],
  },
  {
    path: '/order',
    name: 'order',
    redirect: '/order/list',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "order" */ '../views/order/index.vue'),
    children: [
      {
        path: 'list',
        name: 'orderList',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "orderList" */ '../views/order/list.vue'),
      },
      {
        path: 'operation',
        name: 'orderOperation',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "orderOperation" */ '../views/order/operation.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
