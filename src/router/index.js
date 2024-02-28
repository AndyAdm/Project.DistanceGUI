import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConfigView from '../views/ConfigView.vue'
import RestartView from '../views/RestartView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    caption: 'Home',
    prependIcon: 'mdi-home',
  },
  {
    path: '/config',
    name: 'config',
    component: ConfigView,
    caption: 'Config',
    prependIcon: 'mdi-settings-helper',
  },
  {
    path: '/restart',
    name: 'restart',
    component: RestartView,
    caption: 'Restart',
    prependIcon: 'mdi-reload',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router