import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import "./../node_modules/purecss/build/pure-min.css";
import "./assets/styles.css";

Vue.use(i18n);
Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
