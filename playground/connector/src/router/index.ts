import { createRouter, createWebHistory } from 'vue-router'
import ConnectorView from '@/views/ConnectorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ConnectorView',
      component: ConnectorView
    }
  ]
})

export default router
