import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { RouteNames, RoutePath, RouteParams } from 'src/consts'
import { useAppStore } from 'src/stores/app'

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
      {
        path: RoutePath.SESSION.CONFIG,
        name: RouteNames.SESSION.CONFIGURE,
        component: () => import('~/views/pages/app/configure.vue'),
        meta: {
          title: 'app.configure',
        },
      },
      {
        path: RoutePath.SESSION.BUGS,
        name: RouteNames.SESSION.BUGS,
        component: () => import('~/views/pages/app/bugs.vue'),
        meta: {
          title: 'app.bugs',
        },
      },
      {
        path: RoutePath.CHECKBOX.TOC,
        name: RouteNames.CHECKBOX.TOC,
        component: () => import('~/views/pages/app/components/checkbox/toc.vue'),
        meta: {
          title: 'app.checkbox.toc',
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
          title: 'session.index'
        }
      },
      {
        path: RoutePath.SESSION.NEW,
        name: RouteNames.SESSION.NEW,
        component: () => import('~/views/pages/session/new.vue'),
        meta: {
          title: 'session.new'
        },
      },
      {
        path: RoutePath.SESSION.ID,
        name: RouteNames.SESSION.ID,
        component: () => import('~/views/pages/session/goto.vue'),
        meta: {
          title: 'session.id'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const appStore = useAppStore()

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
    } else {
      next({ name: RouteNames.SESSION.ROOT, query: queryParams })
    }
  } else {
    next()
  }
})

export default router
