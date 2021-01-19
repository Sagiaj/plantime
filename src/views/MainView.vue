<template>
  <v-row justify="space-around">
    <v-col cols="10" align="center" align-self="center">
      <TasksCalendar />
    </v-col>
  </v-row>
</template>

<script>
import TasksCalendar from "@/components/calendar/TasksCalendar";
import { mapActions, mapGetters } from "vuex";
import { hasRequiredUserSettings } from "@/utilities/router-utilities";

export default {
  name: "MainView",
  components: { TasksCalendar },
  computed: {
    ...mapGetters(["userTasks", "userSettings", "user"])
  },
  methods: {
    ...mapActions(["propagateError", "getUserTasksList"])
  },
  async beforeMount() {
    try {
      // await this.getUserTasksList();
      const hasRequiredSettings = hasRequiredUserSettings(this.userSettings);
      if (!hasRequiredSettings) {
        // return this.$router.push({
        //   path: "/settings"
        // });
      }
      if (!this.userTasks) {
        // return this.$router.push({
        //   path: "/tasks"
        // });
      }
    } catch (err) {
      this.propagateError(err);
    }
  }
};
</script>
