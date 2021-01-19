<template>
  <div class="subheading font-weight-light grey--text">
    <v-row justify="space-around" align="center">
      <v-col align="center">
        <WorkHoursDialog
          :workHours="workHours.start"
          :label="'שעת התחלה'"
          @updateTimeSection="time => updateTimeSection(time, 'start')"
        />
      </v-col>
      <v-col align="center">
        <WorkHoursDialog
          :workHours="workHours.end"
          :label="'שעת סיום'"
          @updateTimeSection="time => updateTimeSection(time, 'end')"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkHoursDialog from "@/components/settings/WorkHoursDialog";

export default {
  name: "WorkHoursSection",
  components: {
    WorkHoursDialog
  },
  props: ["workHours"],
  methods: {
    updateTimeSection(time, section) {
      this.workHours[section] = time;
    }
  },
  data() {
    return {
      startDialog: false,
      endDialog: false
    };
  }
};
</script>
