export declare function mathJax(): any;
export declare function injectMathJaxScript(): void;
export declare function initMathJax(options?: {}, callback?: () => void): void;
export declare function isMathJaxInjected(): boolean;
export declare function isMathJaxReady(): boolean;
export declare function renderByMathJaxSync(el: HTMLElement | HTMLElement[]): void;
export declare function renderByMathJax(el: HTMLElement | HTMLElement[]): Promise<void>;
export declare function renderByMathJaxQueued(el: HTMLElement | HTMLElement[], flush?: boolean): void;
