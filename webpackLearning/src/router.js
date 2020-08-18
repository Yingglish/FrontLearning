import Vue from "vue";
import VueRouter from "vue-router";

import home from "./views/home.vue";

Vue.use(VueRouter);

let router = new VueRouter({
  // mode = "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/about.vue")
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});

export default router;
