<template>
  <v-app
    light
    :style="{
      background: $vuetify.theme.themes['light'].background
    }"
  >
    <Navbar :enabled="authStateFinished" />
    <v-main light style="background-color: var(--v-background-base);">
      <transition name="fade" mode="out-in">
        <router-view class="maximal-view" />
      </transition>
    </v-main>
    <ErrorPopup />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import { mapGetters } from "vuex";
import ErrorPopup from "@/components/reuse/ErrorPopup.vue";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
    ErrorPopup
  },
  computed: {
    ...mapGetters(["authStateFinished"])
  },
  data() {
    return {};
  }
});
</script>

<style>
.router-link-app {
  text-decoration: none;
}
</style>
