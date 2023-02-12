import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useStateStore } from '../stores/state'

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
      component: DashboardView
    },
  ]
})

router.beforeEach(async (to, from) => {
  const state = useStateStore();
  if (
    // make sure the user is authenticated
    !state.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name === 'dashboard'
    &&
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
  if (
    // make sure the user is authenticated
    state.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name === 'login'
    &&
    to.name !== 'dashboard'
  ) {
    // redirect the user to the login page
    return { name: 'dashboard' }
  }
});

export default router
