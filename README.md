# Vue MathJax

This is a vue mathjax component, which uses slots instead of passing formula as prop.

# Usage

```vue
<template>
  <math-jax>
    <div class="container">
      <p>This is a vue component for $MathJax$</p>
      <p>Instead of using <strong>span</strong> and pass formula as prop</p>
      <p>But using <strong>slots</strong></p>
      <p>$$c^2 = a ^ 2 + b ^ 2$$</p>
    </div>
  </math-jax>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```