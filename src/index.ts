import MathJax from "./components/MathJax.vue";
import {
  initMathJax,
  renderByMathJax,
  renderByMathJaxSync
} from "./utils/util";

function install(Vue: any) {
  Vue.component("math-jax", MathJax);
}

export default {
  install,
  MathJax,
  initMathJax,
  renderByMathJax,
  renderByMathJaxSync
};
