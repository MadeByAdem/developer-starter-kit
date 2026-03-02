import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

// Router — defines which page (view) is shown for each URL.
// Add new routes here when you create new pages.
//
// Example:
//   { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') }
//
// Lazy loading (the import() syntax) means the page is only loaded when the user visits it.
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
