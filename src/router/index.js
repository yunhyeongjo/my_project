import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NextView from '../views/NextView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/next',
    name: 'next',
    component: NextView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
