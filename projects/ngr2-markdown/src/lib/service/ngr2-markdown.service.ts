import {Injectable} from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib/index';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {MarkdownImpl, MarkdownOptionImpl} from '../core/markdown/markdown';
import {FileOperatorImpl} from '../core/fileOperator';
import {map} from 'rxjs/operators';
import {TextParser} from '../utils/textParser';

@Injectable({
  providedIn: 'root'
})
export class Ngr2MarkdownService {

  /**
   * 接收Markdown源文本
   */
  private originMd: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private resetMd: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /**
   * 观察`originMd`通过`render`方法渲染出的HTML
   */
  private renderMd: BehaviorSubject<MarkdownContent> = new BehaviorSubject(null);
  private _md: MarkdownImpl;
  /**
   * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
   */
  currentHeading: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  /**
   * @deprecated
   */
  currentContent: BehaviorSubject<{md: string, html: string}> = new BehaviorSubject<{md: string, html: string}>({md: '', html: ''});
  /**
   * 发送目录信息的Subject
   */
  TOCInfo: BehaviorSubject<TOCItem> = new BehaviorSubject<TOCItem>(null);
  syncScroll: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(null);

  constructor() {
    this._md = new MarkdownImpl();
    this._md.use(this.anchor)
      .subscribe((value: Array<any>) => {
        const infoList = value.map((item) => {
          return new TOCItem(item.content, item.indentLevel);
        });
        const root = new TOCItem('root', 0);
        let TOCInfo = root;
        for (let i = 0; i < infoList.length; i++) {
          while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
            TOCInfo = TOCInfo.parent;
          }
          infoList[i].parent = TOCInfo;
          TOCInfo.children.push(infoList[i]);
          TOCInfo = infoList[i];
        }
        this.TOCInfo.next(root);
      });

    this.originMd
      .pipe(
        map(mdText => {
          const html = this.render(mdText);
          return {
            md:   mdText || null,
            html,
            Markdown: TextParser.parseMD(mdText),
            HTML: TextParser.parseHTML(html)
          };
        })
      ).subscribe(this.renderMd);

    this.resetMd
      .subscribe(this.originMd);
  }

  /**
   * 重置markdown文本
   * @param md
   */
  reinitialization(md: string): void {
    if (!md) { return; }
    this.resetMd.next(md);
  }

  /**
   * markdown文本重置后, 发出消息
   */
  observerResetMarkdown(): Observable<string> {
    return this.resetMd;
  }

  /**
   * 更新markdown文本, 用于实时预览功能
   * @param md
   */
  updateMarkdown(md: string | Observable<string>): void {
    if (!md) { return; }

    if (md instanceof Observable) {
      md.subscribe(this.originMd);
    } else {
      this.originMd.next(md);
    }
  }

  /**
   * markdown文本更新后, 发出消息
   */
  observeMarkdown(): Observable<MarkdownContent> {
    return this.renderMd;
  }

  /**
   * 将Markdown原始文本渲染成HTML格式
   * @param markdown
   * @param options
   */
  render(markdown: string, options?: MarkdownOptionImpl): string {
    if (!markdown) {
      markdown = '';
    }
    const html = this._md.render(markdown, options);
    return html;
  }

  /**
   * 设置当前浏览的标题
   * @param heading - 标题标签的id
   */
  setCurrentHeading(heading: string): void {
    if (this.currentHeading.getValue() !== heading) {
      this.currentHeading.next(heading);
    }
  }

  /**
   * 将当前显示的内容转换成`data:`url
   * @param type - `markdown`/`html`: 要转换的内容
   */
  currentContentToDataUrl(type: string): FileOperatorImpl {
    const fileOperator = new FileOperatorImpl();
    // 兼容ie11-10, ie10不支持File对象的构造函数, 无法新建File对象, 故使用Blob
    let file: Blob | File;
    switch (type) {
      case 'markdown':
        file = new Blob([this.currentContent.getValue().md], {type: 'text/plain'});
        break;
      case `html`:
        file = new Blob([this.currentContent.getValue().html], {type: 'text/html'});
        break;
      default:
        file = new Blob(['null'], {type: 'text/html'});
        break;
    }
    fileOperator.toDataURLSync(file);
    return fileOperator;
  }

  /**
   * Plugin: anchor
   * 这个方法向类型为heading_open的token添加id, 用于锚点定位
   * @param md - MarkdownIt instance
   * @param observer - use to push info
   */
  private anchor(md: MarkdownIt, observer: Observer<Array<any>>) {
    md.core.ruler.push('anchor', (state => {
      const infoList: Array<any> = [];
      state.tokens.map((token, index, array) => {
        if (token.type === 'heading_open') {
          token.attrJoin('id', array[index + 1].content);
          infoList.push({
            content: token.attrGet('id'),
            indentLevel: token.markup.length
          });
        }
      });
      observer.next(infoList);
    }));
  }
}

export interface MarkdownContent {
  md: string;
  html?: string;
  Markdown?: {
    text:   string,
    bytes:  number,
    words:  number,
    lines:  number
  };
  HTML?: {
    text:       string,
    characters: number,
    words:      number,
    paragraphs: number
  };
}
/**
 * 目录(TOC)生成的位置
 * start: TOC在内容左边
 * end: 右边
 */
type TocPos = 'left' | 'right';
/**
 * 模式
 * preview: 预览模式
 * edit: 编辑模式
 */
type Mode = 'preview' | 'edit';

export class EditorOption {
  static MODE: Mode = 'edit';
  static ANCHOR = false;
  static TOc = false;
  static TOOL_BAR = false;
  static DIRECTION: TocPos = 'left';
  static HEIGHT = '800px';
  static THEME_COLOR = '#3f51b5';
  static BODY_CLASS_NAME = 'markdown-body';

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

  constructor(mode: Mode            = EditorOption.MODE,
            anchor: boolean         = EditorOption.ANCHOR,
              TOC: boolean          = EditorOption.TOc,
              toolBar: boolean      = EditorOption.TOOL_BAR,
              direction: TocPos     = EditorOption.DIRECTION,
              height: string        = EditorOption.HEIGHT,
              themeColor: string    = EditorOption.THEME_COLOR,
              bodyClassName: string = EditorOption.BODY_CLASS_NAME
  ) {
    this.mode =           mode;
    this.anchor =         anchor;
    this.TOC =            TOC;
    this.toolBar =        toolBar;
    this.direction =      direction;
    this.height =         height;
    this.themeColor =     themeColor;
    this.bodyClassName =  bodyClassName;
  }

  static instanceOf(value: EditorOption) {
    return new EditorOption(
      value.mode          || EditorOption.MODE,
      value.anchor        || EditorOption.ANCHOR,
      value.TOC           || EditorOption.TOc,
      value.toolBar       || EditorOption.TOOL_BAR,
      value.direction     || EditorOption.DIRECTION,
      value.height        || EditorOption.HEIGHT,
      value.themeColor    || EditorOption.THEME_COLOR,
      value.bodyClassName || EditorOption.BODY_CLASS_NAME,
    );
  }
}

export class TOCItem {
  content: string;
  indentLevel: number;
  parent: TOCItem;
  children: Array<TOCItem>;

  constructor(content: string, indentLevel: number) {
    this.content      = content;
    this.indentLevel  = indentLevel;
    this.children     = new Array<TOCItem>();
  }
}
