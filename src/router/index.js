import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyAccount from '@/views/dashboard/MyAccount.vue'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProDuct from '@/views/ProDuct.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
import MyAccountData from '@/views/dashboard/MyAccountData.vue'
import CheckOut from '@/views/CheckOut.vue'

import store from '@/store'
import CheckOutOk from '@/views/CheckOutOk.vue'
import MyOrder from '@/views/dashboard/MyOrder.vue'
import MyOrderDateils from '@/views/dashboard/MyOrderDateils.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import InputResetPassword from '@/views/InputResetPassword.vue'
import SingleCheckOut from '@/views/SingleCheckOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: LogIn

    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword

    },
    {
      path: '/inputresetpassword',
      name: 'InputResetPassword',
      component: InputResetPassword

    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
    },
    {
      path: '/my-account-data',
      name: 'MyAccountData',
      component: MyAccountData,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/order/:trackid/',
      name: 'MyOrderDateils',
      component: MyOrderDateils,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/ProductPage',
      name: 'ProductPage',
      component: ProductPage,
    },
    {
      path: '/product/:slug/',
      name: 'ProDuct',
      component: ProDuct,
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/CheckOut',
      name: 'CheckOut',
      component: CheckOut,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/SingleCheckOut',
      name: 'SingleCheckOut',
      component: SingleCheckOut,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/CheckOutOk',
      name: 'CheckOutOk',
      component: CheckOutOk,
      meta: {
        requireLogin: true
      }
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin && !store.state.isPass)){
    // eslint-disable-next-line no-undef
    Swal.fire({
      title: "尚未登入!",
      text: "立即登入或加入我們吧!",
      icon: "warning"
    });
    next({name: 'LogIn', query: {to: to.path}})
  } else{
    next()
  }
})

export default router
