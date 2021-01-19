<template>
  <v-list-item>
    <v-list-item-icon>
      <v-btn
        v-if="!canFinish"
        text
        outlined
        color="success"
        @click.native="canFinish = true"
      >
        בוצע!
      </v-btn>
      <div v-else>
        <v-row justify="space-around">
          <v-col cols="6" align="center">
            <v-icon color="success">mdi-check</v-icon>
          </v-col>
          <v-col cols="6" align="center">
            <v-icon>mdi-cancel</v-icon>
          </v-col>
        </v-row>
      </div>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="task.title"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "TaskListItem",
  props: ["task"],
  computed: {},
  data() {
    return {
      canFinish: false
    };
  }
};
</script>
