<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import {
  onMounted,
  getCurrentInstance,
  nextTick,
  onUpdated,
  onUnmounted,
} from "vue";
import { initMathJax, renderByMathJaxQueued } from "../utils/util";

let el: HTMLElement | null;

const renderMathJax = () => {
  if (!el) return;

  renderByMathJaxQueued(el);
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
