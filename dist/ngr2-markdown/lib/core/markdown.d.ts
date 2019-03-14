import * as MarkdownIt from 'markdown-it/lib/index';
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
    render(markdown: string, options?: MarkdownOption): string;
    use<T>(fn: (md: MarkdownIt, subject: Observer<T>) => void): Observable<T>;
    enable(option: MarkdownOption): void;
    disable(option: MarkdownOption): void;
}
export declare class MarkdownOptionImpl implements MarkdownOption {
    anchor: boolean;
}
interface Markdown {
    render(markdown: string, options: any): any;
    use<T>(fn: (md: MarkdownIt, observer: Observer<T>) => void): any;
    enable(option: MarkdownOption): any;
    disable(option: MarkdownOption): any;
}
interface MarkdownOption {
    anchor: boolean;
}
export {};
