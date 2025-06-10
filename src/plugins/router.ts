// src/plugins/router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Welcome from '@/components/Welcome.vue'
import Main from '@/components/Main.vue'
// import Projects from '@/components/Projects.vue'
// import Contact from '@/components/Contact.vue'

const routes : RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Main },
//   { path: '/projects', name: 'Projects', component: () => import('@/components/Projects.vue') },
//   { path: '/contact', name: 'Contact', component: () => import('@/components/Contact.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.addRoute({ path: '/projects', name: 'Projects', component: () => import('@/components/Projects.vue') })
// router.addRoute({ path: '/contact', name: 'Contact', component: () => import('@/components/Contact.vue') })

export default router
