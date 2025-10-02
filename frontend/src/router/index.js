import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'          // the array we just built
import { useUserStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
})

// Add route guards for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('auth_token');
  const userStore = useUserStore();
  
  // Routes that require authentication
  const protectedRoutes = [
    'memberDashboard', // Add both variations to be safe
    // Add other protected route names here
  ];
  
  // Routes that require admin role
  const adminRoutes = [
    'adminDashboard',
    // Add other admin route names here
  ];
  
  if (protectedRoutes.includes(to.name) && !isAuthenticated) {
    // Redirect to login if trying to access protected route without authentication
    userStore.logout(); // Clear any stale auth data
    next({ name: 'Login' });
  } else if (adminRoutes.includes(to.name) && (!isAuthenticated || userStore.getRole !== 'admin')) {
    // Redirect to login if trying to access admin route without proper role
    userStore.logout(); // Clear any stale auth data
    next({ name: 'Login' });
  } else {
    next(); // Allow navigation
  }
});

export default router
