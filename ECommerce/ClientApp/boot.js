
import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';
import NProgress from "nprogress";
import store from "./store";



Vue.use(BootstrapVue);
Vue.use(VueRouter);

// filters
import { currency, date } from"./filters";

Vue.filter("currency", currency);
Vue.filter("date", date);

// VueToastr

import VueToastr from "@deveodk/vue-toastr";
import "@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";

Vue.use(VueToastr, {
  defaultPosition:"toast-top-right"
});

import VeeValidate from "vee-validate";

Vue.use(VeeValidate);


//import page components
import Catalogue from "./pages/Catalogue.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart.vue";
import Checkout from "./pages/Checkout.vue";
import Account from"./pages/Account.vue";

import axios from "axios";

// store에 인증값이 있다면 axios header에 인증 값을 넣어놓음
const initialStore = localStorage.getItem("store");

if (initialStore) {
  store.commit("initialise", JSON.parse(initialStore));
  if (store.getters.isAuthenticated) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      store.state.auth.access_token
    }`;
  }
}

const routes = [
  { path: "/products", component: Catalogue },
  { path: "/products/:slug", component: Product },
  { path: "/cart", component: Cart, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/checkout", component: Checkout, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/account", component:Account, meta: { requiresAuth: true, role: "Customer" }},
  // {
  //   path: "/admin",
  //   component: AdminIndex,
  //   meta: { requiresAuth: true, role: "Admin" },
  //   redirect: "/admin/orders",
  //   children: [
  //     {
  //       path: "orders",
  //       component: AdminOrders
  //     },
  //     {
  //       path: "products",
  //       component: AdminProducts
  //     },
  //     {
  //       path: "products/create",
  //       component: AdminCreateProduct
  //     }
  //   ]
  // },
  { path: "*", redirect: "/products" }
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      store.commit("showAuthModal");
      next({ path: from.path, query: { redirect: to.path } });
    } else {
      if (
        to.matched.some(
          route => route.meta.role && store.getters.isInRole(route.meta.role)
        )
      ) {
        next();
      } else if (!to.matched.some(route => route.meta.role)) {
        next();
      } else {
        next({ path: "/" });
      }
    }
  } else {
    if (
      to.matched.some(
        route =>
          route.meta.role &&
          (!store.getters.isAuthenticated ||
            store.getters.isInRole(route.meta.role))
      )
    ) {
      next();
    } else {
      if (to.matched.some(route => route.meta.role)) {
        next({ path: "/" });
      }

      next();
    }
  }
});


router.afterEach((to, from) => {
  NProgress.done();
});

new Vue({
  el: "#app-root",
  router: router,
  store,
  render: h => h(require("./components/App.vue"))
});