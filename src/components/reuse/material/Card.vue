<template>
  <v-card v-bind="$attrs" :style="styles" v-on="$listeners">
    <material-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <v-card
        v-if="!$slots.offset && titleType === 'card'"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <slot v-if="!title && !text" name="header" />
        <span v-else>
          <h4 class="title font-weight-light pl-3 pt-3 mb-3" v-text="title" />
          <p class="category font-weight-thin ml-3 pb-3" v-text="text" />
        </span>
      </v-card>
      <v-alert
        v-if="!$slots.offset && titleType === 'alert'"
        text
        color="primary lighten-2"
        dense
        max-height="100px"
        class="v-card--material__header text--white"
      >
        <slot v-if="!title && !text" name="header" />
        <span v-else>
          <h4 class="title font-weight-light pl-3 pt-3 mb-3" v-text="title" />
          <p class="category font-weight-thin ml-3 pb-3" v-text="text" />
        </span>
      </v-alert>
      <slot v-else name="offset" />
    </material-offset>

    <v-card-text>
      <slot />
      <v-divider v-if="$slots.actions"></v-divider>
    </v-card-text>

    <v-card-actions class="mt-2" v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MaterialCard",
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    titleType: {
      type: String,
      default: "card"
    }
  },
  computed: {
    hasOffset() {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      );
    },
    styles() {
      if (!this.hasOffset) return null;
      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}
</style>
