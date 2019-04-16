import {MarkType} from './markdownMarker';

export class MarkdownRenderer {

  curEl: HTMLElement;
  curRange: Range;

  constructor() {
  }

  /**
   * 渲染`Range`
   * @param range - 要渲染的`Range`
   * @param type - 渲染的类型
   * @param extra - 额外信息
   */
  renderRange(range: Range, type: MarkType, extra?: ExtRenderInfo) {
    this.curRange = range;
    return this.renderEl(this._getRangeEl(range), type, extra);
  }

  /**
   * 渲染`HTMLElement`
   * @param el - 要渲染的`HTMLElement`
   * @param type - 渲染类型
   * @param extra - 额外信息
   */
  renderEl(el: HTMLElement, type: MarkType, extra?: ExtRenderInfo) {
    this.curEl = el;
    switch (type) {
      case MarkType.HEADING:
        this._heading(extra);
        break;
      // case MarkType.BLOCK_QUOTE:
      //   this._blockQuote(extra);
      //   break;
      // case MarkType.LIST_ITEM:
      //   this._listItem(extra);
      //   break;
      // case MarkType.CODE_BLOCK:
      //   this._codeBlock(extra);
      //   break;
      // case MarkType.CODE_INLINE:
      //   this._codeInline(extra);
      //   break;
      case MarkType.DEFAULT:
      default:
        this._default(extra);
        break;
    }
  }

  private _heading(extra?: ExtRenderInfo) {
    const level = extra && extra.headingLevel || 1;
    if (this.curEl.className === 'h' + level) { return; }
    this.curEl.className = 'h' + level;
  }

  private _blockQuote(extra?: ExtRenderInfo) {
    if (this.curEl.className === 'blockquote') { return; }
    this.curEl.className = 'blockquote';
  }

  private _listItem(extra?: ExtRenderInfo) {
    if (this.curEl.className === 'li') { return; }
    this.curEl.className = 'li';
  }

  private _codeBlock(extra?: ExtRenderInfo) {
    if (this.curEl.className === 'code') { return; }

    if (this.curEl.parentElement.className !== 'pre') {
      this.curEl.className = 'pre';
      const offset = this.curRange.startOffset;
      const parEl = document.createElement('DIV');
      parEl.appendChild(this.curRange.startContainer);
      parEl.className = 'code';

      this.curEl.appendChild(parEl);
      this.curRange.setStart(parEl, offset);
    } else {
      this.curEl.className = 'code';
    }
  }

  private _codeInline(extra?: ExtRenderInfo) {
  }

  private _default(extra?: ExtRenderInfo) {
    if (this.curEl.className !== 'p') {
      this.curEl.className = 'p';
    }
  }

  /**
   * 获取Range的所在的元素节点(非文本节点)
   * @param range - range
   */
  private _getRangeEl(range: Range): HTMLElement {
    const startEl = range.startContainer;
    let el: HTMLElement;

    if (startEl.nodeType === Node.TEXT_NODE) {
      el = startEl.parentElement;
    } else if (startEl.nodeType === Node.ELEMENT_NODE) {
      el = startEl as HTMLElement;
    }

    return el;
  }
}

export interface ExtRenderInfo {
  headingLevel?: number;
  [key: string]: any;
}
