// @dynamic
export class TextParser {

  private static _DIV = document.createElement('DIV');
  static WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);

  private static parse(text: string = ''): {
    text: string,
    words: number,
    bytes: number,
    lines: number
  } {
    const words = (text.match(TextParser.WORDS) || []).length;
    let bytes = 0;
    let lines = 0;
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) & 0xff00) {
        bytes++;
      } else if (text.charAt(i) === '\n') {
        lines++;
      }
      bytes++;
    }
    return {
      text: text,
      words: words,
      bytes: bytes,
      lines: lines
    };
  }

  static parseMD(markdown: string): any {
    return this.parse(markdown);
  }

  static parseHTML(html: string): any {
    TextParser._DIV.innerHTML = html;

    const result = this.parse(TextParser._DIV.textContent);
    return {
      text: html,
      characters: result.bytes,
      words: result.words,
      paragraphs: result.lines
    };
  }
}
