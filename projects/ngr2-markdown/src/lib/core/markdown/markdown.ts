// import * as MarkdownIt from 'markdown-it';
// 如上用TS的@types包装引入在ie11中无法兼容, 在打包出来的vendor.js中会有一行使用了箭头函数的代码报(语法错误)
// 直接引入markdown-it.min.js可以避免
import * as MarkdownIt from 'node_modules/markdown-it/dist/markdown-it.min.js';
import {Observable, Observer} from 'rxjs';
import * as hljs from 'highlight.js';

export class MarkdownImpl implements Markdown {
  markdownIt: MarkdownIt;

  constructor() {
    this.markdownIt = new MarkdownIt({
      highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str).value +
              '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + this.markdownIt.utils.escapeHtml(str) + '</code>';
      }
    });
  }

  /**
   * render markdown text function
   * 渲染函数
   * @param markdown - markdown format text - markdown格式的文本
   * @param options - use to open or close plugins
   * @return - return transformation html - 返回渲染后的html
   */
  render(markdown: string, options?: MarkdownOption) {
    this.disable(options);
    const html = this.markdownIt.render(markdown);
    this.enable(options);
    return html;
  }

  /**
   * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
   * fn.md: Markdown对象内容都在里面
   * fm.subject: 观察者, 处理结果由此传出
   * @param fn
   */
  use<T>(fn: (md: MarkdownIt, subject: Observer<T>) => void): Observable<T> {
    const md = this.markdownIt;
    const observable = new Observable<T>(function (subscriber) {
      md.use(fn, subscriber);
    });
    return observable;
  }

  enable(option: MarkdownOption) {
    if (!option) { return; }
    const enableRules = Object.keys(option).filter((value => {
      return !option[value];
    }));
    this.markdownIt.enable(enableRules);
  }

  disable(option: MarkdownOption) {
    if (!option) { return; }
    const disableRules = Object.keys(option).filter((value => {
      return !option[value];
    }));
    this.markdownIt.disable(disableRules);
  }
}

export class MarkdownOptionImpl implements MarkdownOption {
  anchor: boolean;
}

interface Markdown {
  render(markdown: string, options: any);
  use<T>(fn: (md: any, observer: Observer<T>) => void);
  enable(option: MarkdownOption);
  disable(option: MarkdownOption);
}

interface MarkdownOption {
  anchor: boolean;
}
