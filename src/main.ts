import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import toast from "./plugins/toast";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/override.scss";
import "./assets/scss/app.scss";
import "bulma";

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(toast);
app.mount("#app");
