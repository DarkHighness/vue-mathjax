import { defineComponent, onMounted, getCurrentInstance, nextTick, onUpdated, onUnmounted, renderSlot } from "vue";
function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var cancelled = false;
  var lastExec = 0;
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }
  if (typeof noTrailing !== "boolean") {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }
    var self = this;
    var elapsed = Date.now() - lastExec;
    if (cancelled) {
      return;
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    if (debounceMode === void 0 && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function debounce(delay, atBegin, callback) {
  return callback === void 0 ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}
let mathJaxInjected = false;
let mathJaxReady = false;
let pendingQueue = [];
function mathJax() {
  return window.MathJax;
}
function injectMathJaxScript() {
  const instance = mathJax();
  if (!instance || !instance.version) {
    mathJaxInjected = false;
    mathJaxReady = false;
    pendingQueue.splice(0, pendingQueue.length);
  }
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
        pendingQueue.splice(0, pendingQueue.length);
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
let waitingQueue = /* @__PURE__ */ new Set();
let doRendering = () => {
  let batch = [];
  for (const el of waitingQueue.values()) {
    batch.push(el);
    window.MathJax.typeset(batch);
  }
  waitingQueue.clear();
};
let debouncedRendering = debounce(500, false, doRendering);
function renderByMathJaxQueued(el, flush = false) {
  if (!mathJaxReady) {
    if (Array.isArray(el)) {
      pendingQueue.concat(el.map((v) => {
        return {
          type: "sync",
          el: v
        };
      }));
    } else {
      pendingQueue.push({ type: "sync", el });
    }
  }
  if (Array.isArray(el)) {
    el.forEach((v) => waitingQueue.add(v));
  } else {
    waitingQueue.add(el);
  }
  if (flush) {
    debouncedRendering.cancel();
    doRendering();
  } else {
    debouncedRendering();
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    let el;
    const renderMathJax = () => {
      if (!el)
        return;
      renderByMathJaxQueued(el);
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
      renderMathJax();
    });
    onUnmounted(() => {
      el = null;
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
