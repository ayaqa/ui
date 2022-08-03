import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { RouteNames, RoutePath, RouteParams } from 'src/consts'
import { useAppStore } from 'src/stores/app';

import DefaultLayout from '~/views/layouts/default.vue'
import AppLayout from '~/views/layouts/app.vue'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePath.HOME,
    component: AppLayout,
    children: [
      {
        path: '',
        name: RouteNames.HOME,
        component: () => import('~/views/pages/app/index.vue'),
        meta: {
          title: 'app.index',
        },
      },
    ],
  },
  {
    path: RoutePath.SESSION.ROOT,
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: RouteNames.SESSION.ROOT,
        component: () => import('~/views/pages/session/index.vue'),
        meta: {
          title: 'session.index',
          noSession: true,
        },
      },
      {
        path: RoutePath.SESSION.NEW,
        name: RouteNames.SESSION.NEW,
        component: () => import('~/views/pages/session/new.vue'),
        meta: {
          title: 'session.new',
          noSession: true,
        },
      },
      {
        path: RoutePath.SESSION.ID,
        name: RouteNames.SESSION.ID,
        component: () => import('~/views/pages/session/goto.vue'),
        meta: {
          title: 'session.id',
          noSession: true,
        },
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const appStore = useAppStore();

  // @TODO handle requested url and keep it as redirect back
  if (false === appStore.isValidSession && false === to.path.startsWith('/session')) {

    const queryParams = { [RouteParams.REDIRECT_TO]: to.path }

    if (appStore.hasSession) {
      next({
        name: RouteNames.SESSION.ID,
        params: {
          [RouteParams.SESSION.ID]: appStore.app.sessionId
        },
        query: queryParams
      })

      return;
    }

    next({ name: RouteNames.SESSION.ROOT, query: queryParams })

    return;
  }

  next();
})

export default router
