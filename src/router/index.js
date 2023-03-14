import { createRouter, createWebHistory } from 'vue-router';
import DjsList from '../views/djs/DjsList.vue';
import RequestsReceived from '../views/requests/RequestsReceived.vue';
import DjRegistration from '../views/djs/DjRegistration.vue';
import DjDetail from '../views/djs/DjDetail.vue';
import ContactDj from '../views/requests/ContactDj.vue';
import NotFound from '../views/NotFound.vue';
import UserAuth from '../views/auth/UserAuth.vue';
import { useAuthStore } from '../stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/djs' },
    { path: '/djs', component: DjsList },
    {
      path: '/djs/:id',
      component: DjDetail,
      props: true,
      children: [{ path: 'contact', component: ContactDj }],
    },
    {
      path: '/register',
      component: DjRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresNotAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next('/auth');
  } else if (to.meta.requiresNotAuth && store.isLoggedIn) {
    next('/djs');
  } else {
    next();
  }
});

export default router;
