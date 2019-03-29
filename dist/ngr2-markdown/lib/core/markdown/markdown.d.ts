import * as MarkdownIt from 'node_modules/markdown-it/dist/markdown-it.min.js';
import { Observable, Observer } from 'rxjs';
export declare class MarkdownImpl implements Markdown {
    markdownIt: MarkdownIt;
    constructor();
    /**
     * render markdown text function
     * 渲染函数
     * @param markdown - markdown format text - markdown格式的文本
     * @param options - use to open or close plugins
     * @return - return transformation html - 返回渲染后的html
     */
    render(markdown: string, options?: MarkdownOption): any;
    /**
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @param fn
     */
    use<T>(fn: (md: MarkdownIt, subject: Observer<T>) => void): Observable<T>;
    enable(option: MarkdownOption): void;
    disable(option: MarkdownOption): void;
}
export declare class MarkdownOptionImpl implements MarkdownOption {
    anchor: boolean;
}
interface Markdown {
    render(markdown: string, options: any): any;
    use<T>(fn: (md: any, observer: Observer<T>) => void): any;
    enable(option: MarkdownOption): any;
    disable(option: MarkdownOption): any;
}
interface MarkdownOption {
    anchor: boolean;
}
export {};
