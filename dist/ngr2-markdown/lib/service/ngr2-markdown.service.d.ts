import { BehaviorSubject, Observable } from 'rxjs';
import { MarkdownOptionImpl } from '../core/markdown/markdown';
import { FileOperatorImpl } from '../core/fileOperator';
export declare class Ngr2MarkdownService {
    /**
     * 接收Markdown源文本
     */
    private originMd;
    private resetMd;
    /**
     * 观察`originMd`通过`render`方法渲染出的HTML
     */
    private renderMd;
    private _md;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     */
    currentHeading: BehaviorSubject<string>;
    /**
     * @deprecated
     */
    currentContent: BehaviorSubject<{
        md: string;
        html: string;
    }>;
    /**
     * 发送目录信息的Subject
     */
    TOCInfo: BehaviorSubject<TOCItem>;
    constructor();
    /**
     * 重置markdown文本
     * @param md
     */
    reinitialization(md: string): void;
    /**
     * markdown文本重置后, 发出消息
     */
    observerResetMarkdown(): Observable<string>;
    /**
     * 更新markdown文本, 用于实时预览功能
     * @param md
     */
    updateMarkdown(md: string | Observable<string>): void;
    /**
     * markdown文本更新后, 发出消息
     */
    observeMarkdown(): Observable<MarkdownContent>;
    /**
     * 将Markdown原始文本渲染成HTML格式
     * @param markdown
     * @param options
     */
    render(markdown: string, options?: MarkdownOptionImpl): string;
    /**
     * 设置当前浏览的标题
     * @param heading - 标题标签的id
     */
    setCurrentHeading(heading: string): void;
    /**
     * 将当前显示的内容转换成`data:`url
     * @param type - `markdown`/`html`: 要转换的内容
     */
    currentContentToDataUrl(type: string): FileOperatorImpl;
    /**
     * Plugin: anchor
     * 这个方法向类型为heading_open的token添加id, 用于锚点定位
     * @param md - MarkdownIt instance
     * @param observer - use to push info
     */
    private anchor;
}
export interface MarkdownContent {
    md: string;
    html?: string;
    Markdown?: {
        text: string;
        bytes: number;
        words: number;
        lines: number;
    };
    HTML?: {
        text: string;
        characters: number;
        words: number;
        paragraphs: number;
    };
}
/**
 * 目录(TOC)生成的位置
 * start: TOC在内容左边
 * end: 右边
 */
declare type TocPos = 'left' | 'right';
/**
 * 模式
 * preview: 预览模式
 * edit: 编辑模式
 */
declare type Mode = 'preview' | 'edit';
export declare class EditorOption {
    static MODE: Mode;
    static ANCHOR: boolean;
    static TOc: boolean;
    static TOOL_BAR: boolean;
    static DIRECTION: TocPos;
    static HEIGHT: string;
    static THEME_COLOR: string;
    static BODY_CLASS_NAME: string;
    mode: Mode;
    anchor: boolean;
    TOC: boolean;
    toolBar: boolean;
    direction: TocPos;
    /**
     * container height property
     */
    height: string;
    /**
     * container toc active color property
     */
    themeColor: string;
    bodyClassName: string;
    constructor(mode?: Mode, anchor?: boolean, TOC?: boolean, toolBar?: boolean, direction?: TocPos, height?: string, themeColor?: string, bodyClassName?: string);
    static instanceOf(value: EditorOption): EditorOption;
}
export declare class TOCItem {
    content: string;
    indentLevel: number;
    parent: TOCItem;
    children: Array<TOCItem>;
    constructor(content: string, indentLevel: number);
}
export {};
