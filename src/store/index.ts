import Vue from "vue";
import Vuex from "vuex";
import globalError from "./modules/global-error";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    globalError,
    auth
  }
});
// secret: "VCbML40DwYnNQhiWLwH6fGUl"