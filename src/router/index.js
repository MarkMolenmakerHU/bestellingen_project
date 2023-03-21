import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import axios from "axios";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    // Authentication
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      isPublicContent: true
    }
  },
  {
    path: '/login/pin',
    name: 'LoginPin',
    component: () => import(/* webpackChunkName: "loginPin" */ '../views/LoginPin.vue'),
    meta: {
      isPublicContent: true
    }
  },
    // Users
  {
    path: '/users',
    name: 'Users',
    component: () => import( /* webpackChunkName: "users" */ '../views/users/Users.vue'),
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: () => import( /* webpackChunkName: "users" */ '../views/users/AddUser.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import( /* webpackChunkName: "users" */ '../views/users/User.vue'),
  },
    // Orders
  {
    path: '/order/register/assembly',
    name: 'OrderListAssembly',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListAssembly.vue')
  },
  {
    path: '/order/register/information',
    name: 'OrderListInformation',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListInformation.vue')
  },
  {
    path: '/order/register/overview',
    name: 'OrderListOverview',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListOverview.vue')
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import( /* webpackChunkName: "users" */ '../views/order/Order.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import( /* webpackChunkName: "users" */ '../views/order/Orders.vue'),
  },
    // Edit Orders
  {
    path: '/order/:id/assembly',
    name: 'OrderEditListAssembly',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/edit/OrderEditListAssembly.vue')
  },
  {
    path: '/order/:id/information',
    name: 'OrderEditListInformation',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/edit/OrderEditListInformation.vue')
  },
  {
    path: '/order/:id/overview',
    name: 'OrderEditListOverview',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/edit/OrderEditListOverview.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

  // If a page that is not public is accessed
  if (to.matched.some(record => !record.meta.isPublicContent)) {

    // If there is no token, login
    if (localStorage.getItem("accessToken") == null) {
      next({ path: "/login" });
    }

    // If there is a token
    else {
      try {
        const response = await axios.get("/api/auth/validate", {
          headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
        })
        if (response.status !== 200) throw new Error("Invalid Access Token")
        next();
      } catch (error) {
        console.log("Invalid Access Token, Checking Refresh Token")

        try {
          // Try validating the refresh token
          const response = await axios.get("/api/auth/validate/refreshToken", {
            headers: {Authorization: `Bearer ${localStorage.getItem("refreshToken")}`}
          })
          if (response.status !== 200) throw new Error("Invalid Refresh Token")
          next({ path: "/login/pin" });
        } catch (error) {
          console.log("Invalid Refresh Token, Logging Out")
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("loggedInUserId");
          next({ path: "/login" });
        }
      }

      // catch (error) {
      //   // If token is not valid, try refreshing it
      //   try {
      //     const response = await axios.post("/api/auth/accessToken", {
      //       refreshToken: localStorage.getItem("refreshToken")
      //     });
      //     const { id, accessToken, refreshToken } = await response.data;
      //     localStorage.setItem("loggedInUserId", id);
      //     localStorage.setItem("accessToken", accessToken);
      //     localStorage.setItem("refreshToken", refreshToken);
      //     next();
      //
      //   }
      //   // Refreshing failed, login
      //   catch (error) {
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //     localStorage.removeItem("loggedInUserId");
      //     next({ path: "/login" });
      //   }
      // }
    }
  }

  // If a public page is accessed
  else {
    next();
  }
})

export default router
