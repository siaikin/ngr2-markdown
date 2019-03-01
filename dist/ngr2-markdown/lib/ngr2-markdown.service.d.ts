import * as MarkdownIt from 'markdown-it/lib/index';
import { BehaviorSubject } from 'rxjs';
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
    MarkdownIt: MarkdownIt;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     */
    currentHeading: BehaviorSubject<string>;
    /**
     * 发送目录信息的Subject
     */
    TOCInfo: BehaviorSubject<TOCItem>;
    constructor();
    toggle(options: MarkdownOption): void;
    /**
     * render markdown text function
     * 渲染函数
     * @param markdown - markdown format text - markdown格式的文本
     * @return - return transformation html - 返回渲染后的html
     */
    render(markdown: string): string;
    /**
     * 这个方法向类型为heading_open的token添加id, 用于锚点定位
     * 并提取id和标题等级
     * 使用方法见this.init()
     * @param md - MarkdownIt instance
     * @param callBack - callBack function look this.init()
     */
    private anchor;
    /**
     * 设置当前浏览的标题
     * @param heading - 标题标签的id
     */
    setCurrentHeading(heading: string): void;
    checkUnit(unitMap: any, str: string, caseSensitive?: boolean): {
        unit: string;
        number: number;
    };
}
export declare class MarkdownOption {
    anchor: boolean;
    TOC: boolean;
}
export declare class TOCItem {
    content: string;
    indentLevel: number;
    parent: TOCItem;
    children: Array<TOCItem>;
    constructor(content: string, indentLevel: number);
}
