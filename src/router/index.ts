import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/home/HomeView.vue'
import TeamView from '../views/team/TeamView.vue'
import LoginView from '../views/authentication/LoginView.vue'
import RegisterView from '../views/authentication/RegisterView.vue'
import Swal from 'sweetalert2'
import ActivityView from '../views/activity/ActivityView.vue'
import CalendarView from '@/views/calendar/CalendarView.vue'
import AccountView from '../views/account/AccountView.vue'

const auth = getAuth()

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView,
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: { requiresAuth: true }
    // Other route options...
  },
  {
    path: '/activity',
    name: 'activity',
    component: ActivityView,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: { requiresAuth: true }
  }
  // ...otros paths
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthRoute = to.path === '/login' || to.path === '/register'

  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      Swal.fire({
        icon: 'info',
        title: 'Acceso restringido',
        text: 'Debes iniciar sesión para acceder a esta página.'
      }).then(() => {
        next('/login')
      })
    } else if (user && isAuthRoute) {
      next('/dashboard') // Redirige al dashboard si el usuario está autenticado y trata de acceder a login o register
    } else {
      next()
    }
  })
})

export default router
