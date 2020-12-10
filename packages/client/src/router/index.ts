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
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
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
    component: () => import(/* webpackChunkName: "Register" */ '@/views/Register.vue'),
  },
  {
    path: '/swaps',
    name: 'Swaps',
    props: true,
    meta: {
      title: 'Takas Oyun Listesi - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (swaps/swaps.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Swaps" */ '@/views/Swaps/Swaps.vue'),
  }, {
    path: '/swap/add',
    name: 'AddSwap',
    props: true,
    meta: {
      title: 'Yeni Oyun Takası Ekle - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (swaps/add.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddSwap" */ '@/views/Swaps/Add.vue'),
  },
  {
    path: '/swap/:name/:swapId/:statusType?',
    name: 'SwapDetail',
    props: true,
    meta: {
      title: 'Ücretsiz Oyun Takas - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (swaps/detail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SwapDetail" */ '@/views/Swaps/Detail.vue'),
  },
  {
    path: '/profile/:name/:userId',
    name: 'ProfileDetail',
    props: true,
    meta: {
      title: 'Ücretsiz Oyun Takas - GameSwap',
    },
    // route level code-splitting
    // this generates a separate chunk (profile/detail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ProfileDetail" */ '@/views/Profile/Detail.vue'),
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
  scrollBehavior() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },
});

export default router;
