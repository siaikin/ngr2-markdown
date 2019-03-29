export class TextParser {

  private static _DIV = document.createElement('DIV');
  static WORDS = new RegExp('/([a-zA-Z]+)|([\u4e00-\u9fa5])/g');

  private static parse(text: string): void {
    if (!text) { return; }
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
    console.log({
      words: words,
      bytes: bytes,
      lines: lines
    });
  }

  static parseMD(markdown: string): void {
    this.parse(markdown);
  }

  static parseHTML(html: string): void {
    TextParser._DIV.innerHTML = html;
    this.parse(TextParser._DIV.textContent);
  }
}
