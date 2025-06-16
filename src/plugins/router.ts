
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Welcome from '@/components/Welcome.vue'
import Layout from '@/components/Layout.vue'

const routes : RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: Layout },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  
})

export default router
