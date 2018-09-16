
import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';
import NProgress from "nprogress";
import store from "./store";


Vue.use(BootstrapVue);
Vue.use(VueRouter);

// filters
import { currency } from"./filters";

Vue.filter("currency", currency);

//import page components
import Catalogue from "./pages/Catalogue.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart.vue";

const routes = [
  { path: "/products", component: Catalogue },
  { path: "/products/:slug", component: Product },
  { path: "/cart", component: Cart },
  { path: "*", redirect: "/products" }
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
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