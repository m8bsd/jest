import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usersList',
    name: 'UsersList',
    component: () => import('../views/UsersList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profileUpdate',
    name: 'ProfileUpdate',
    component: () => import('../views/ProfileUpdate'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/postUpdate/:id',
    name: 'PostUpdate',
    component: () => import('../views/PostUpdate'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:id',
    name: 'OnePost',
    component: () => import('../views/OnePost'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/updateComment/:id',
    name: 'UpdateComment',
    component: () => import('../views/UpdateComment'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("groupomaniaUser") == null) {
      next({
        name: "Home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router