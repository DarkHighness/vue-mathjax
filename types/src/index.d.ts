import { initMathJax, renderByMathJax, renderByMathJaxSync } from "./utils/util";
declare function install(Vue: any): void;
declare const _default: {
    install: typeof install;
    MathJax: import("vue").DefineComponent<{}, {
        el: HTMLElement;
        renderMathJax: () => Promise<void>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    initMathJax: typeof initMathJax;
    renderByMathJax: typeof renderByMathJax;
    renderByMathJaxSync: typeof renderByMathJaxSync;
};
export default _default;
