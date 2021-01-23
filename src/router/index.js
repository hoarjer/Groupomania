import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/user_account/:id',
    name: 'UserAccount',
    component: () => import('../views/user/UserAccount.vue')
  },
  {
    path: '/user_image',
    name: 'UserImage',
    component: () => import('../views/user/UserImage.vue')
  },
  {
    path: '/user_bio',
    name: 'UserBio',
    component: () => import('../views/user/UserBio.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AllPosts.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/secure',
    name: 'Secure',
    component: () => import('../components/Secure.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
