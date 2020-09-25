import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md"
  },
  theme: {
    themes: {
      light: {
        primary: colors.purple.lighten2,
        secondary: colors.deepOrange.base,
        background: colors.grey.lighten2
      }
    }
  }
});
