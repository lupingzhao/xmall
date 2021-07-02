import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

const routes = [

  {
    path: '/Login',
    name: '/Login',
    component: () => import('../views/login/Login'),
    meta: {
      title: "登陆",
      index: '/Login',
    }
  },

  {
    path: '/Registered',
    name: '/Registered',
    component: () => import('../views/login/registered/Registered.vue'),
    meta: {
      title: "注册",
      index: '/Registered'
    }
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/Text',
        name: 'Text',
        component: () => import('../views/text/Text.vue'),
        meta: {
          title: "测试",
          index: '/Text',
        }
      },
      // 首页
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: "首页",
          index: '/'
        }
      },
      // 商品详情
      {
        path: '/goodsDetail',
        name: '/goodsDetail',
        component: () => import('../views/goodsDetail/goodsDetail'),
        meta: {
          title: "详情",
          index: '/goodsDetail'
        }
      },
    ]

  },

  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '页面不存在',
      index: '*',

    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // 网页标题
  document.title = to.meta.title
  next()
})
export default router
