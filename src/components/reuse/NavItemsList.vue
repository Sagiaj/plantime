<template>
  <v-card>
    <v-list-item class="px-2">
      <v-list-item-avatar @click.native="shouldGoToHome ? goToHome() : null">
        <v-img src="../../assets/logo.png" v-if="!mini"></v-img>
        <v-btn fab text icon v-else>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-list-item-avatar>
      <v-list-item-title>Meal Mentor</v-list-item-title>
      <v-btn icon @click.stop="minimizedActionByBreakpoint()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        @click.native="item.action"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavItemsList",
  props: ["drawer"],
  components: {},
  computed: {
    shouldGoToHome() {
      return !this.mini || this.isSmall;
    },
    isSmall() {
      return !this.$vuetify.breakpoint.mdAndDown;
    }
  },
  methods: {
    ...mapActions(["authUserLogout"]),
    minimizedActionByBreakpoint() {
      if (this.isSmall) {
        this.drawer = false;
      } else {
        this.mini = !this.mini;
      }
    },
    goToAuthView() {
      this.$router.push({
        path: "/auth"
      });
    },
    goToHome() {
      this.$router.push({
        path: "/"
      });
    },
    goToSetupView() {
      this.$router.push({
        path: "/setup"
      });
    },
    logout() {
      this.authUserLogout().then(() => {
        this.goToAuthView();
      });
    }
  },
  data() {
    return {
      mini: false,
      navItems: [
        {
          icon: "logout",
          title: "Sign out",
          action: this.logout
        }
      ]
    };
  }
};
</script>
