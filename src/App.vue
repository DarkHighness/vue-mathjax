<template>
  <math-jax>
    <div class="container">
      <p>This is a vue component for $MathJax \, 3$</p>
      <p>Instead of using <strong>span</strong> and pass formula as prop</p>
      <p>But using <strong>slots</strong></p>
      <p>{{ formula }}</p>
    </div>
  </math-jax>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

let idx = ref(0);
let formulas = ref([
  "$$\\alpha \\beta \\gamma \\rho \\sigma \\delta \\epsilon$$",
  "$$c^2 = a ^ 2 + b ^ 2$$",
  "$$e^{ \\pm i\\theta } = \\cos \\theta \\pm i\\sin \\theta$$",
  "$$	\\int \\oint \\sum \\prod$$"
]);
let timer: any;

let formula = computed(() => formulas.value[idx.value]);

onMounted(() => {
  timer = setInterval(() => {
    idx.value = (idx.value + 1) % formulas.value.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
