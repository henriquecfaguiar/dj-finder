import { createRouter, createWebHistory } from 'vue-router';
import DjsList from '../views/djs/DjsList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/djs' },
    { path: '/djs', component: DjsList },
    {
      path: '/djs/:id',
      component: null,
      children: [{ path: 'contact', component: null }],
    },
    { path: '/register', component: null },
    { path: '/requests', component: null },
    { path: '/:notFound(.*)', component: null },
  ],
});

export default router;
