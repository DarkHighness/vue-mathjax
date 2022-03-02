import { createApp } from "vue";

// @ts-ignore
import MathJax from "../dist/vue3-mathjax.es.js";
import App from "./App.vue";

createApp(App).use(MathJax).mount("#app");
