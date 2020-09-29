import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  icons: {
    iconfont: "mdi"
  },
  theme: {
    default: "light",
    themes: {
      light: {
        primary: colors.purple.lighten2,
        secondary: colors.deepOrange.base,
        background: colors.grey.lighten2
      }
    }
  }
});
