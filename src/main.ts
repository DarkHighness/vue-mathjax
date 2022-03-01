import { createApp } from "vue";

// @ts-ignore
import MathJax from "../dist/vue3-mathjax3.es.js";
import App from "./App.vue";

createApp(App).use(MathJax).mount("#app");
