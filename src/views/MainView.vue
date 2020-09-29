<template>
  <v-row justify="space-around">
    <v-col cols="10" align="center" align-self="center">
      <TasksCalendar />
    </v-col>
  </v-row>
</template>

<script>
import TasksCalendar from "@/components/calendar/TasksCalendar";

export default {
  name: "MainView",
  components: { TasksCalendar }
};
</script>
