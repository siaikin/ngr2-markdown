import { BehaviorSubject } from 'rxjs';
import { MarkdownImpl, MarkdownOptionImpl } from '../core/markdown';
import { FileOperatorImpl } from '../core/fileOperator';
export declare class Ngr2MarkdownService {
    unitMap: {
        exist: boolean;
        child: {
            'b': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'c': {
                exist: boolean;
                child: {
                    'i': {
                        exist: boolean;
                        child: {};
                    };
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'h': {
                exist: boolean;
                child: {
                    'c': {
                        exist: boolean;
                        child: {};
                    };
                    'l': {
                        exist: boolean;
                        child: {
                            'r': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'i': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'm': {
                exist: boolean;
                child: {
                    'e': {
                        exist: boolean;
                        child: {
                            'r': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                    'm': {
                        exist: boolean;
                        child: {};
                    };
                    'c': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'n': {
                exist: boolean;
                child: {
                    'i': {
                        exist: boolean;
                        child: {
                            'm': {
                                exist: boolean;
                                child: {
                                    'v': {
                                        exist: boolean;
                                        child: {};
                                    };
                                };
                            };
                        };
                    };
                };
            };
            'p': {
                exist: boolean;
                child: {
                    'a': {
                        exist: boolean;
                        child: {
                            'c': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                };
            };
            'q': {
                exist: boolean;
                child: {};
            };
            't': {
                exist: boolean;
                child: {
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'w': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'x': {
                exist: boolean;
                child: {
                    'a': {
                        exist: boolean;
                        child: {
                            'm': {
                                exist: boolean;
                                child: {
                                    'v': {
                                        exist: boolean;
                                        child: {};
                                    };
                                };
                            };
                        };
                    };
                    'e': {
                        exist: boolean;
                        child: {};
                    };
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
        };
    };
    markdownIt: MarkdownImpl;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     */
    currentHeading: BehaviorSubject<string>;
    currentContent: BehaviorSubject<{
        md: string;
        html: string;
    }>;
    /**
     * 发送目录信息的Subject
     */
    TOCInfo: BehaviorSubject<TOCItem>;
    constructor();
    render(markdown: string, options?: MarkdownOptionImpl): string;
    /**
     * 设置当前浏览的标题
     * @param heading - 标题标签的id
     */
    setCurrentHeading(heading: string): void;
    checkUnit(str: string, unitMap?: any, caseSensitive?: boolean): {
        unit: string;
        number: number;
    };
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
/**
 * 目录(TOC)生成的位置
 * start: TOC在内容左边
 * end: 右边
 */
export declare type TocPos = 'left' | 'right';
/**
 * 模式
 * preview: 预览模式
 * edit: 编辑模式
 */
export declare type Mode = 'preview' | 'edit';
export declare class MarkdownOption {
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
    constructor(anchor?: boolean, TOC?: boolean, toolBar?: boolean, direction?: TocPos, height?: string, themeColor?: string, bodyClassName?: string);
}
export declare class TOCItem {
    content: string;
    indentLevel: number;
    parent: TOCItem;
    children: Array<TOCItem>;
    constructor(content: string, indentLevel: number);
}
