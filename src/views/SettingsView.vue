<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="4" align="center">
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-row>
              <v-col>
                <div class="title font-weight-light mb-2">
                  נתוני משתמש
                </div>
              </v-col>
            </v-row>
          </v-sheet>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              User Registrations
            </div>
            {{ settings.work_hours }}
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >last registration 26 minutes ago</span
            >
            <div>
              {{ userSettings.work_hours }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" align="center">
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-row>
              <v-col>
                <div class="title font-weight-light mb-2">
                  שעות עבודה
                </div>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet>
            <v-card-text class="pt-0" v-if="settings.work_hours">
              <WorkHoursSection :workHours.sync="settings.work_hours" />
            </v-card-text>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col cols="6" align="center">
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-row>
              <v-col>
                ימי עבודה
                <v-tooltip v-model="workDaysInfo" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="primary">
                        info_outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>ימי העבודה בהם המשימות יכנסו</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <v-footer absolute bottom color="background">
      <v-row justify="center">
        <v-col cols="3" align="center">
          <v-btn
            color="success"
            :loading="viewLoadingState"
            @click.native="saveSettings"
            :disabled="!settingsHaveChanged"
            class="background--text"
          >
            Save
            <v-icon right>mdi-check-circle</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3" align="center">
          <v-btn
            color="error lighten-1"
            :loading="viewLoadingState"
            @click.native="revertSettings"
            :disabled="!settingsHaveChanged"
            class="background--text"
          >
            Revert
            <v-icon right>mdi-check-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WorkHoursSection from "@/components/settings/WorkHoursSection";

const compare = (o1, o2) => {
  let truth = true;
  for (const prop in o1) {
    if (!truth) return false;
    if (
      typeof o1[prop] == "string" ||
      typeof o1[prop] == "number" ||
      typeof o1[prop] == "boolean" ||
      typeof o1[prop] !== typeof o2[prop]
    ) {
      truth = truth && o1[prop] == o2[prop];
    } else {
      truth = truth && compare(o1[prop], o2[prop]);
    }
  }
  for (const prop in o2) {
    if (!truth) return false;
    if (
      typeof o2[prop] == "string" ||
      typeof o2[prop] == "number" ||
      typeof o2[prop] == "boolean" ||
      typeof o2[prop] !== typeof o2[prop]
    ) {
      truth = truth && o1[prop] == o2[prop];
    } else {
      truth = truth && compare(o1[prop], o2[prop]);
    }
  }
  return truth;
};

export default {
  name: "SettingsView",
  //   VBoilerplate: {
  //     functional: true,
  //     render(h, { data, props, children }) {
  //       return h(
  //         "v-skeleton-loader",
  //         {
  //           ...data,
  //           props: {
  //             boilerplate: true,
  //             elevation: 2,
  //             ...props
  //           }
  //         },
  //         children
  //       );
  //     }
  //   },
  components: { WorkHoursSection },
  computed: {
    ...mapGetters(["viewLoadingState", "userSettings"]),
    settingsHaveChanged() {
      const { userSettings: o1, settings: o2 } = this;
      if (!o1 || !Object.keys(o1).length || !o2 || !Object.keys(o2).length)
        return false;

      const same =
        o1.work_days.sort().toString() == o2.work_days.sort().toString() &&
        o1.work_hours.start == o2.work_hours.start &&
        o1.work_hours.end == o2.work_hours.end &&
        o1.current_goal == o2.current_goal;
      return !same;
    },
    hasRequiredSettings() {
      return (
        this.userSettings &&
        this.userSettings.work_days &&
        this.userSettings.work_hours &&
        this.userSettings.work_hours.start &&
        this.userSettings.work_hours.end
        //  &&
        // this.userSettings.current_goal
      );
    }
  },
  methods: {
    ...mapActions(["getUserSettings", "updateUserSettings"]),
    async saveSettings() {
      try {
        await this.updateUserSettings(this.settings);
      } catch (err) {
        console.log("Could not save settings. error:", err);
      }
    },
    revertSettings() {
      this.settings = { ...this.userSettings };
    }
  },
  async beforeMount() {
    try {
      this.settings = {
        ...this.userSettings,
        // eslint-disable-next-line @typescript-eslint/camelcase
        work_hours: { ...this.userSettings.work_hours }
      };
    } catch (err) {
      console.log("Error:", err);
    }
  },
  data() {
    return {
      settings: {},
      workDaysInfo: false
    };
  }
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
