<template>
  <v-card tile>
    <v-skeleton-loader
      ref="skeleton"
      :boilerplate="true"
      type="card"
      :loading="viewLoadingState"
      :transition="'scale-transition'"
      class="mx-auto"
    >
      <v-responsive transition="scale-transition">
        <slot name="navigation"></slot>
      </v-responsive>
    </v-skeleton-loader>
    <v-list rounded>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="userTasksModel" color="primary">
        <TaskListItem v-for="(task, i) in userTasks" :key="i" :task="task" />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TasksList",
  components: {},
  computed: {
    ...mapGetters(["userTasks", "viewLoadingState"])
  },
  methods: {
    ...mapActions(["propagateError", "getUserTasksList"])
  },
  async beforeMount() {
    try {
      // await this.getUserTasksList();
    } catch (err) {
      this.propagateError(err);
    }
  },
  data() {
    return {
      loading: false,
      userTasksModel: []
    };
  }
};
</script>
