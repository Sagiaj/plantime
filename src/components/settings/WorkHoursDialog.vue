<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker format="24hr" v-if="modal" v-model="time" full-width>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="saveWorkHours()">
        OK
      </v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "WorkHoursDialog",
  props: ["workHours", "label"],
  computed: {},
  methods: {
    saveWorkHours() {
      this.$emit("updateTimeSection", this.time);
      this.$refs.dialog.save(this.time);
    }
  },
  beforeMount() {
    if (this.workHours) {
      this.time = this.workHours;
    }
  },
  data() {
    return {
      time: null,
      modal: false
    };
  }
};
</script>
