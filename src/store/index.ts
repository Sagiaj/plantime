import Vue from "vue";
import Vuex from "vuex";
import globalError from "./modules/global-error";
import auth from "./modules/auth";
import settings from "./modules/user-settings";
import loadingState from "./modules/loading-screen";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    globalError,
    auth,
    settings,
    loadingState,
    tasks
  }
});
// secret: "VCbML40DwYnNQhiWLwH6fGUl"