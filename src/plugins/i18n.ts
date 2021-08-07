import { createI18n } from "vue-i18n";
import vi from "@/assets/lang/vi";
import en from "@/assets/lang/en";

export default createI18n({
  locale: "vi",
  fallbackLocale: "en",
  legacy: false, // you must set `false`, to use Composition API
  messages: {
    vi,
    en,
  },
});
