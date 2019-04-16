import {ExtRenderInfo} from './markdwonRenderer';

// @dynamic
export class MarkdownMarker {

  static headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
  static blockQuoteRegExp = new RegExp(/^\s*>.*/);
  static listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
  static codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);

  constructor() {
  }

  /**
   * 判断是否符合Markdown规则
   * @param text - 要判断的字符串
   */
  testMarks(text: string): MarkType {
    if (MarkdownMarker.headingRegExp.test(text)) {
      return MarkType.HEADING;
    } else if (MarkdownMarker.blockQuoteRegExp.test(text)) {
      return MarkType.BLOCK_QUOTE;
    } else if (MarkdownMarker.listItemRegExp.test(text)) {
      return MarkType.LIST_ITEM;
    } else if (MarkdownMarker.codeBlockRegExp.test(text)) {
      return MarkType.CODE_BLOCK;
    } else {
      return MarkType.DEFAULT;
    }
  }

  /**
   * 传入符合heading的字符串，返回解析的数据(`#`号个数)
   * @param text - heading字符串
   */
  parseHeading(text: string): ExtRenderInfo {
    if (!text) { return; }
    let length;
    length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;

    return {
      headingLevel: length
    };
  }
}

export enum MarkType {
  HEADING     = 'heading',
  BLOCK_QUOTE = 'block quote',
  LIST_ITEM   = 'list item',
  CODE_BLOCK  = 'code block',
  CODE_INLINE = 'code inline',
  NOTHING     = 'nothing',
  DEFAULT     = 'default'
}
