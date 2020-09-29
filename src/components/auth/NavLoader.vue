<template>
  <v-container>
    <v-skeleton-loader
      ref="skeleton"
      :boilerplate="true"
      type="list-item-avatar-three-line"
      :loading="loading"
      class="mx-auto"
      ><br
    /></v-skeleton-loader>
    <div v-if="loading">
      <br />
      <v-divider></v-divider>
      <br />
    </div>
    <v-skeleton-loader
      ref="skeleton"
      :boilerplate="true"
      type="card"
      :loading="loading"
      :transition="'scale-transition'"
      class="mx-auto"
    >
      <v-responsive transition="scale-transition">
        <slot name="navigation"></slot>
      </v-responsive>
    </v-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  name: "NavLoader",
  props: ["loading"],
  data() {
    return {};
  }
};
</script>
