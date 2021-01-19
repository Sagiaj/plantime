import Vue from "vue";
import firebase from "@/config/firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { mapActions } from 'vuex';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  methods: {
    ...mapActions(["authAutoLogin", "propagateError", "setPreAuthRoute"])
  },
  beforeMount() {
    const basePath = `${window.location.origin}/#`;
    const relativePath = window.location.href.split(basePath)[1];
    this.setPreAuthRoute(relativePath);
    import('firebase/auth').then(() => {
      firebase.auth().onAuthStateChanged(async user => await this.authAutoLogin(user));
    });
  },
  render: h => h(App)
}).$mount("#app");
