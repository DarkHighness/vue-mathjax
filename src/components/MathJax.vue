<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import {
  onMounted,
  getCurrentInstance,
  nextTick,
  onUpdated,
  onUnmounted
} from "vue";
import { renderByMathJax, initMathJax } from "../utils/util";

let el: HTMLElement | null;

const renderMathJax = async () => {
  if (!el) return;

  await renderByMathJax(el);
};

onMounted(() => {
  initMathJax();

  el = getCurrentInstance()?.vnode?.el?.parentNode;

  nextTick(() => {
    renderMathJax();
  });
});

onUpdated(() => {
  el = getCurrentInstance()?.vnode?.el?.parentNode;

  renderMathJax();
});

onUnmounted(() => {
  el = null;
});
</script>
