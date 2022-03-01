import MathJax from "./components/MathJax.vue";
import { App } from "vue";
import {
  initMathJax,
  renderByMathJax,
  renderByMathJaxSync,
} from "./utils/util";

function install(instance: App) {
  instance.component("math-jax", MathJax);
}

const plugin = {
  install,
  version: "0.0.1",
};

export default plugin;

export { MathJax, initMathJax, renderByMathJaxSync, renderByMathJax };
