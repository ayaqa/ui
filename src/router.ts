import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { RouteNames, RoutePath } from 'src/consts'

import DefaultLayout from '~/views/layouts/default.vue';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePath.HOME,
    name: RouteNames.HOME,
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('~/views/pages/home/index.vue'),
        meta: {
          title: 'home.index',
        },
      },
      {
        path: RoutePath.GOTO.NEW,
        name: RouteNames.GOTO.NEW,
        component: () => import('~/views/pages/home/new.vue'),
        meta: {
          title: 'goto.new',
        },
      },
      {
        path: RoutePath.GOTO.ID,
        name: RouteNames.GOTO.ID,
        component: () => import('~/views/pages/home/goto.vue'),
        meta: {
          title: 'goto.id',
        },
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
