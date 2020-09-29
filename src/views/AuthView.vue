<template>
  <AuthLoader v-if="!authStateFinished" />
  <v-container v-else>
    <v-row justify="center" v-if="!authenticationError">
      <v-col
        align="center"
        align-self="center"
        text-xs-center
        cols="6"
        v-if="!user"
      >
        <v-alert type="info" prominent :value="true" outlined color="secondary">
          <h3 class="headline mb-0">
            Please sign in so we can do amazing things together
          </h3>
          <v-btn color="background" @click.stop="googleLogin">
            <span>Sign in with Google</span>
          </v-btn>
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col align="center">
        <v-alert
          color="error"
          :value="true"
          outlined
          transition="fade-transition"
        >
          Could not log in. Please try again.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AuthLoader from "@/components/auth/AuthLoader";

export default {
  name: "AuthView",
  components: { AuthLoader },
  watch: {
    user(usr) {
      if (usr !== null) {
        this.goToHome();
      }
    }
  },
  computed: {
    ...mapGetters(["user", "authStateFinished", "authenticationError"])
  },
  methods: {
    ...mapActions(["propagateError", "authLogin"]),
    goToHome() {
      this.$router.push({
        path: "/"
      });
    },
    async googleLogin() {
      try {
        await this.authLogin();
        // this.goToHome();
      } catch (err) {
        this.propagateError(err);
      }
    }
  },
  data() {
    return {
      dialog: true,
      initialDate: +new Date()
    };
  }
};
</script>
