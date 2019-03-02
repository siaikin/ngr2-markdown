import * as MarkdownIt from 'markdown-it/lib/index';
import {Observable, Observer, Subject} from 'rxjs';
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

  use<T>(fn: (md: MarkdownIt, subject: Observer<T>) => void): Observable<T> {
    const md = this.markdownIt;
    const subject = new Subject<T>();
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
  use<T>(fn: (md: MarkdownIt, observer: Observer<T>) => void);
  enable(option: MarkdownOption);
  disable(option: MarkdownOption);
}

interface MarkdownOption {
  anchor: boolean;
}
