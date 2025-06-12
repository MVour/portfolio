
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Welcome from '@/components/Welcome.vue'
import Layout from '@/components/Layout.vue'

const routes : RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: Layout },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
          const el = document.querySelector(to.hash)
          if (el) {
            return { el, behavior: 'smooth', top: 0 }
          }
        }
        else if (savedPosition) {
          return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
          
    },
  
})

export default router
