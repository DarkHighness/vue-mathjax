<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
import { renderByMathJax, initMathJax } from "../utils/util";

let el: HTMLElement;

const renderMathJax = async () => {
  if (el) {
    await renderByMathJax(el);
  }
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

  nextTick(() => {
    renderMathJax();
  });
});
</script>
