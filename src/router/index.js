import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NextView from '../views/NextView.vue'
import LastView from '../views/LastView.vue'

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
  },
  {
    path: '/last',
    name: 'last',
    component: LastView
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
