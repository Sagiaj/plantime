import { hasRequiredUserSettings } from '@/utilities/router-utilities';
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/auth",
    name: "AuthView",
    component: () => import("@/views/AuthView.vue"),
  },
  {
    path: "/",
    name: "MainView",
    component: () => import("@/views/MainView.vue"),
    meta: {
      requiresAuth: true,
      requiresSettings: true,
      requiresTasks: true /*,
      requiresWritePermission: true*/,
    },
  },
  {
    path: "/tasks",
    name: "TasksView",
    component: () => import("@/views/TasksView.vue"),
    meta: {
      requiresAuth: true,
      requiresSettings: true /*,
      requiresWritePermission: true*/,
    },
  },
  {
    path: "/settings",
    name: "SettingsView",
    component: () => import("@/views/SettingsView.vue"),
    meta: {
      requiresAuth: true /*,
      requiresWritePermission: true*/,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (from.name === to.name) return;
  console.log("Router - start");
  const {
    user,
    preAuthRoute,
    userTasks,
    userSettings,
    authStateFinished,
  } = store.getters;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("Router - requiresAuth. user:", user);
    // Route requires Auth
    if (!user) {
      console.log("Router - redirecting to /auth");
      return next({
        path: "/auth",
      });
    } else {
      // User exists
      if (authStateFinished) {
        console.log("Router - route meta:", to.meta);
        const hasRequiredSettings = hasRequiredUserSettings(userSettings);
        if ( to.matched.some((record) => record.meta.requiresSettings && !hasRequiredSettings) ) {
          console.log("Router - redirecting to /settings");
          return next({
            path: "/settings",
          });
        }
        if ( to.matched.some((record) => record.meta.requiresTasks && !(userTasks && userTasks.length)) ) {
          console.log("Router - redirecting to /tasks");
          return next({
            path: "/tasks",
          });
        }
      }

      if (preAuthRoute) {
        console.log("Router - calling Auth/setPreAuthRoute");
        await store.dispatch("setPreAuthRoute", null);
        return next();
      }
      console.log("Router - returning next()");
      return next();
    }
  } else {
    // Route does not require auth
    console.log("Router - doesnt require auth. continue");
    return next();
  }
});

export default router;
