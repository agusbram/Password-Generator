import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PasswordGenerator from '../components/PasswordGenerator.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: PasswordGenerator },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
