import { defineComponent, onMounted, getCurrentInstance, nextTick, onUpdated, renderSlot } from "vue";
let mathJaxInjected = false;
let mathJaxReady = false;
let pendingQueue = [];
function mathJax() {
  return window.MathJax;
}
function injectMathJaxScript() {
  if (!mathJaxInjected) {
    const mathJaxScript = document.createElement("script");
    mathJaxScript.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    mathJaxScript.async = true;
    document.head.appendChild(mathJaxScript);
    mathJaxInjected = true;
  }
}
function initMathJax(options = {}, callback) {
  const defaultOptions = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEnvironments: true,
      processRefs: true
    },
    options: {
      skipHtmlTags: [
        "script",
        "noscript",
        "style",
        "textarea",
        "pre",
        "code",
        "annotation",
        "annotation-xml"
      ],
      ignoreHtmlClass: "tex2jax_ignore"
    },
    startup: {
      pageReady: () => {
        mathJaxReady = true;
        mathJax().typeset(pendingQueue.map((v) => v.el));
        pendingQueue.forEach((v) => {
          if (v.type == "async")
            v.callback();
        });
        callback && callback();
      }
    },
    svg: {
      fontCache: "global"
    }
  };
  const mergedOptions = Object.assign({}, defaultOptions, options);
  window.MathJax = mergedOptions;
  injectMathJaxScript();
}
function renderByMathJaxSync(el) {
  if (!mathJaxReady) {
    if (Array.isArray(el)) {
      pendingQueue.concat(el.map((v) => {
        return {
          type: "sync",
          el: v
        };
      }));
    } else {
      pendingQueue.push({
        type: "sync",
        el
      });
    }
    return;
  }
  window.MathJax.typeset(Array.isArray(el) ? el : [el]);
}
async function renderByMathJax(el) {
  return new Promise((resolve, reject) => {
    if (mathJaxReady) {
      return window.MathJax.typesetPromise(Array.isArray(el) ? el : [el]);
    } else {
      if (Array.isArray(el)) {
        for (let i = 0; i < el.length; i++) {
          pendingQueue.push({
            type: "sync",
            el: el[i]
          });
        }
        pendingQueue.push({
          type: "async",
          el: el[el.length - 1],
          callback: resolve
        });
      } else {
        pendingQueue.push({
          type: "async",
          el,
          callback: resolve
        });
      }
    }
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    let el;
    const renderMathJax = async () => {
      if (el) {
        await renderByMathJax(el);
      }
    };
    onMounted(() => {
      var _a, _b, _c;
      initMathJax();
      el = (_c = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.vnode) == null ? void 0 : _b.el) == null ? void 0 : _c.parentNode;
      nextTick(() => {
        renderMathJax();
      });
    });
    onUpdated(() => {
      var _a, _b, _c;
      el = (_c = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.vnode) == null ? void 0 : _b.el) == null ? void 0 : _c.parentNode;
      nextTick(() => {
        renderMathJax();
      });
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
function install(Vue) {
  Vue.component("math-jax", _sfc_main);
}
var index = {
  install,
  MathJax: _sfc_main,
  initMathJax,
  renderByMathJax,
  renderByMathJaxSync
};
export { index as default };
