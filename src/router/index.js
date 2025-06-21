import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NextView from '../views/NextView.vue'
import LastView from '../views/LastView.vue'
import LetterView from '../views/LetterView.vue'
import BoxView from '../views/BoxView.vue'

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
  },
  {
    path: '/Box',
    name: 'Box',
    component: BoxView
  },
  {
    path: '/Letter',
    name: 'Letter',
    component: LetterView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
