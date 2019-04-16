import { ExtRenderInfo } from './markdwonRenderer';
export declare class MarkdownMarker {
    static headingRegExp: RegExp;
    static blockQuoteRegExp: RegExp;
    static listItemRegExp: RegExp;
    static codeBlockRegExp: RegExp;
    constructor();
    /**
     * 判断是否符合Markdown规则
     * @param text - 要判断的字符串
     */
    testMarks(text: string): MarkType;
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param text - heading字符串
     */
    parseHeading(text: string): ExtRenderInfo;
}
export declare enum MarkType {
    HEADING = "heading",
    BLOCK_QUOTE = "block quote",
    LIST_ITEM = "list item",
    CODE_BLOCK = "code block",
    CODE_INLINE = "code inline",
    NOTHING = "nothing",
    DEFAULT = "default"
}
