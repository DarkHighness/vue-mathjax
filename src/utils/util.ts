let mathJaxInjected = false;
let mathJaxReady = false;
let pendingQueue: (
  | { type: "sync"; el: HTMLElement }
  | {
      type: "async";
      el: HTMLElement;
      callback: (_: void | PromiseLike<void>) => void;
    }
)[] = [];

export function mathJax(): any {
  return (window as any).MathJax;
}

export function injectMathJaxScript() {
  if (!mathJaxInjected) {
    const mathJaxScript = document.createElement("script");

    mathJaxScript.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    mathJaxScript.async = true;

    document.head.appendChild(mathJaxScript);

    mathJaxInjected = true;
  }
}

export function initMathJax(options = {}, callback?: () => void) {
  const defaultOptions = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEnvironments: true,
      processRefs: true,
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
        "annotation-xml",
      ],
      ignoreHtmlClass: "tex2jax_ignore",
    },
    startup: {
      pageReady: () => {
        mathJaxReady = true;

        mathJax().typeset(pendingQueue.map((v) => v.el));

        pendingQueue.forEach((v) => {
          if (v.type == "async") v.callback();
        });

        callback && callback();
      },
    },
    svg: {
      fontCache: "global",
    },
  };

  const mergedOptions = Object.assign({}, defaultOptions, options);

  (window as any).MathJax = mergedOptions;

  injectMathJaxScript();
}

export function isMathJaxInjected(): boolean {
  return mathJaxInjected;
}

export function isMathJaxReady(): boolean {
  return mathJaxReady;
}

export function renderByMathJaxSync(el: HTMLElement | HTMLElement[]): void {
  if (!mathJaxReady) {
    if (Array.isArray(el)) {
      pendingQueue.concat(
        el.map((v) => {
          return {
            type: "sync",
            el: v,
          };
        })
      );
    } else {
      pendingQueue.push({
        type: "sync",
        el,
      });
    }

    return;
  }

  (window as any).MathJax.typeset(Array.isArray(el) ? el : [el]);
}

export async function renderByMathJax(
  el: HTMLElement | HTMLElement[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (mathJaxReady) {
      return (window as any).MathJax.typesetPromise(
        Array.isArray(el) ? el : [el]
      );
    } else {
      if (Array.isArray(el)) {
        for (let i = 0; i < el.length; i++) {
          pendingQueue.push({
            type: "sync",
            el: el[i],
          });
        }

        pendingQueue.push({
          type: "async",
          el: el[el.length - 1],
          callback: resolve,
        });
      } else {
        pendingQueue.push({
          type: "async",
          el,
          callback: resolve,
        });
      }
    }
  });
}
