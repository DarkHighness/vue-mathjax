(function(n,i){typeof exports=="object"&&typeof module!="undefined"?module.exports=i(require("vue")):typeof define=="function"&&define.amd?define(["vue"],i):(n=typeof globalThis!="undefined"?globalThis:n||self,n["vue-mathjax"]=i(n.Vue))})(this,function(n){"use strict";let i=!1,c=!1,s=[];function d(){return window.MathJax}function h(){const e=d();if((!e||!e.version)&&(i=!1,c=!1,s.splice(0,s.length)),!i){const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",t.async=!0,document.head.appendChild(t),i=!0}}function u(e={},t){const a=Object.assign({},{tex:{inlineMath:[["$","$"]],displayMath:[["$$","$$"]],processEnvironments:!0,processRefs:!0},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code","annotation","annotation-xml"],ignoreHtmlClass:"tex2jax_ignore"},startup:{pageReady:()=>{c=!0,d().typeset(s.map(r=>r.el)),s.forEach(r=>{r.type=="async"&&r.callback()}),s.splice(0,s.length),t&&t()}},svg:{fontCache:"global"}},e);window.MathJax=a,h()}function y(e){if(!c){Array.isArray(e)?s.concat(e.map(t=>({type:"sync",el:t}))):s.push({type:"sync",el:e});return}window.MathJax.typeset(Array.isArray(e)?e:[e])}async function l(e){return new Promise((t,p)=>{if(c)return window.MathJax.typesetPromise(Array.isArray(e)?e:[e]);if(Array.isArray(e)){for(let a=0;a<e.length;a++)s.push({type:"sync",el:e[a]});s.push({type:"async",el:e[e.length-1],callback:t})}else s.push({type:"async",el:e,callback:t})})}const f=n.defineComponent({setup(e){let t;const p=async()=>{!t||await l(t)};return n.onMounted(()=>{var a,r,o;u(),t=(o=(r=(a=n.getCurrentInstance())==null?void 0:a.vnode)==null?void 0:r.el)==null?void 0:o.parentNode,n.nextTick(()=>{p()})}),n.onUpdated(()=>{var a,r,o;t=(o=(r=(a=n.getCurrentInstance())==null?void 0:a.vnode)==null?void 0:r.el)==null?void 0:o.parentNode,p()}),n.onUnmounted(()=>{t=null}),(a,r)=>n.renderSlot(a.$slots,"default")}});function m(e){e.component("math-jax",f)}var x={install:m,MathJax:f,initMathJax:u,renderByMathJax:l,renderByMathJaxSync:y};return x});
