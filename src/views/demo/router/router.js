const _import = require('./_import_' + process.env.NODE_ENV)

const  routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: _import('pages/Home'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/VR',
    name: 'vr',
    component: _import('pages/VR'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/earth',
    name: 'earth',
    component: _import('pages/Earth'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: _import('pages/About'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/components/NotFound.vue')
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }
]
export default routes
