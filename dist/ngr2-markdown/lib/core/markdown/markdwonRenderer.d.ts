import { MarkType } from './markdownMarker';
export declare class MarkdownRenderer {
    curEl: HTMLElement;
    curRange: Range;
    constructor();
    /**
     * 渲染`Range`
     * @param range - 要渲染的`Range`
     * @param type - 渲染的类型
     * @param extra - 额外信息
     */
    renderRange(range: Range, type: MarkType, extra?: ExtRenderInfo): void;
    /**
     * 渲染`HTMLElement`
     * @param el - 要渲染的`HTMLElement`
     * @param type - 渲染类型
     * @param extra - 额外信息
     */
    renderEl(el: HTMLElement, type: MarkType, extra?: ExtRenderInfo): void;
    private _heading;
    private _blockQuote;
    private _listItem;
    private _codeBlock;
    private _codeInline;
    private _default;
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @param range - range
     */
    private _getRangeEl;
}
export interface ExtRenderInfo {
    headingLevel?: number;
    [key: string]: any;
}
