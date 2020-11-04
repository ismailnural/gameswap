import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'GameSwap - Ücretsiz Oyun Takas Platformu',
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Giriş Yap - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Kayıt Ol - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/swaps',
    name: 'Swaps',
    props: true,
    meta: {
      title: 'Takas Oyun Listesi - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "swaps" */ '@/views/Swaps/Swaps.vue'),
  },
  {
    path: '/swap/:name/:swapId',
    name: 'Swap',
    props: true,
    meta: {
      title: 'Ücretsiz Oyun Takas - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "swap" */ '@/views/Swaps/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404 - Sayfa Bulunamadı - GameSwap',
    },
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
