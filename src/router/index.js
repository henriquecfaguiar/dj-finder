import { createRouter, createWebHistory } from 'vue-router';
import DjsList from '../views/djs/DjsList.vue';
import RequestsReceived from '../views/requests/RequestsReceived.vue';
import DjRegistration from '../views/djs/DjRegistration.vue';
import DjDetail from '../views/djs/DjDetail.vue';
import ContactDj from '../views/requests/ContactDj.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/djs' },
    { path: '/djs', component: DjsList },
    {
      path: '/djs/:id',
      component: DjDetail,
      children: [{ path: 'contact', component: ContactDj }],
    },
    { path: '/register', component: DjRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: null },
  ],
});

export default router;
