import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/auth",
    name: "AuthView",
    component: () => import("@/views/AuthView.vue")
  },
  {
    path: "/",
    name: "MainView",
    component: () => import("@/views/MainView.vue"),
    meta: {
      requiresAuth: true /*,
      requiresWritePermission: true*/
    }
  },
  {
    path: "/tasks",
    name: "TasksView",
    component: () => import("@/views/TasksView.vue"),
    meta: {
      requiresAuth: true /*,
      requiresWritePermission: true*/
    }
  },
  {
    path: "/settings",
    name: "SettingsView",
    component: () => import("@/views/SettingsView.vue"),
    meta: {
      requiresAuth: true /*,
      requiresWritePermission: true*/
    }
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach(async (to, from, next) => {
  if (from.name === to.name) return;
  const currentUser = store.getters.user;
  if (to.matched.some(record => record.meta.requiresAuth)) { // Route requires Auth
    if (!currentUser) {
      next({
        path: "/auth"
      });
    } else { // User exists
      next();
    }
  } else { // Route does not require auth
    next();
  }
});

export default router;
