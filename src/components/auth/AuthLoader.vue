<template>
  <v-sheet color="background" class="px-3 pt-3 pb-12">
    <v-responsive>
      <v-container>
        <v-row justify="space-around">
          <v-col cols="12" md="4" align="center">
            <v-skeleton-loader
              :loading="true"
              transition="out-in"
              height="94"
              type="card-avatar"
            />
            <v-skeleton-loader
              :loading="true"
              transition="out-in"
              height="94"
              type="date-picker"
            />
            <v-skeleton-loader
              :loading="true"
              transition="out-in"
              height="94"
              type="actions"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </v-sheet>
</template>

<script>
export default {
  name: "AuthLoader",
  components: {
    // VBoilerplate: {
    //   functional: true,
    //   render(h, { data, props, children }) {
    //     return h(
    //       "v-skeleton-loader",
    //       {
    //         ...data,
    //         props: {
    //           boilerplate: true,
    //           elevation: 2,
    //           ...props
    //         }
    //       },
    //       children
    //     );
    //   }
    // }
  }
};
</script>
