import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
// import store from '@/store/store'


Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/pages/Home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login')
    },
    {
      path: '*',
      component: () => import('@/pages/404'),
      meta: {
        title: 'FChat - 404: Page not found',
        metaTags: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    }
  ]
})

router.afterEach(() => {
  // On small screens collapse sidenav
  if (window.layoutHelpers && window.layoutHelpers.isSmallScreen() && !window.layoutHelpers.isCollapsed()) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10)
  }
})

// validate login and redirect to require path
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.loggedIn) {
//       next({ path: '/login', query: { redirect: to.fullPath } })
//     } else {
//       next()
//     }
//   } else {
//     if (store.getters.loggedIn && to.name === 'login') {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   }
// })

export default router
