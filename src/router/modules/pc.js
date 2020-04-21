export default [
  {
    path:'/home',
    component: () => import('@/Home.vue')

  },
  {
    path:'/pchome',
    component: () => import('@/views/pcTest/Home/index.vue')
  },
  {
    path: '/form',
    component: () => import('@/views/pcTest/Form/index.vue')
  }
]
