import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useLoginStore } from '../stores/loginStore.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requireLogin: true
      }
    },
  ]
})


router.beforeEach((to, from, next) => {
  const store = useLoginStore()
  if(to.meta.requireLogin && !store.isLogged ) {
    next({name: 'login'})
  }
  else next()
})

export default router
