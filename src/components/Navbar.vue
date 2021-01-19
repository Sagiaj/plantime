<template>
  <v-navigation-drawer
    permanent
    app
    right
    :style="{ background: $vuetify.theme.themes['light'].background }"
  >
    <NavLoader :loading="!authStateFinished">
      <template slot="navigation">
        <v-list v-if="user">
          <v-list-item class="px-2" link>
            <router-link class="router-link-app" to="/">
              <v-list-item-avatar size="50px">
                <img src="../assets/logo.png" alt="alt" />
              </v-list-item-avatar>
            </router-link>
            <v-list-item-content>
              <router-link class="router-link-app" to="/">
                <v-row justify="center">
                  <v-col align-self="center">
                    <i class="text--secondary">Plantime</i>
                  </v-col>
                </v-row>
              </router-link>
            </v-list-item-content>
            <v-divider inset vertical class="my-5"></v-divider>
            <v-list-item-action>
              <v-btn fab text>
                <router-link class="router-link-app" to="/settings">
                  <v-icon large color="primary">settings</v-icon>
                </router-link>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">{{
                user.displayName
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon text large v-if="user" @click.native="signOut">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item class="px-2" align="center">
            <v-btn outlined color="primary" @click.native="signIn">
              Log in
            </v-btn>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list nav dense v-if="user">
          <v-list-item link to="/tasks">
            <v-list-item-icon class="py-6">
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ערוך משימות</v-list-item-title>
            <v-list-item-action
              ><v-btn icon>
                <v-icon>mdi-arrow-left</v-icon></v-btn
              ></v-list-item-action
            >
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-container v-if="isHomeView">
          <TasksList />
          <!-- <v-row justify="center">
            <v-col align="center">
              lola :D
            </v-col>
          </v-row> -->
        </v-container>
      </template>
    </NavLoader>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavLoader from "@/components/auth/NavLoader";
import TasksList from "@/components/tasks/TasksList";

export default {
  name: "Navbar",
  props: ["enabled"],
  components: { NavLoader, TasksList },
  computed: {
    ...mapGetters(["user", "authStateFinished"]),
    isHomeView() {
      return this.$route.name == "MainView";
    }
  },
  methods: {
    ...mapActions(["propagateError", "authSignOut", "authLogin"]),
    goToHome() {
      this.goTo("");
    },
    goToSettings() {
      this.goTo("settings");
    },
    goTo(route) {
      const resolvedRoute = `/${route}`;
      this.$router.push({
        path: resolvedRoute
      });
    },
    async signOut() {
      try {
        await this.authSignOut();
        this.goTo("auth");
      } catch (err) {
        this.propagateError(err);
      }
    },
    async signIn() {
      try {
        await this.authLogin();
        this.goToHome();
      } catch (err) {
        this.$router.push({
          path: "/auth"
        });
        this.propagateError(err);
      }
    }
  },
  data() {
    return {};
  }
};
</script>
