import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class HTMLPipePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  /**
   * use DomSanitizer allow insert outside HTML
   * 使用DomSanitizer允许插入外部的HTML
   * @param value - html content html内容
   * @param args = 第一个参数是内容类型`html/url` 默认为 `html`
   * @return - transformed html content html变换后的内容
   */
  transform(value: any, ...args: any[]): SafeHtml | SafeUrl {
    const type = args[0];
    switch (type) {
      case 'html':
        return this.domSanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.domSanitizer.bypassSecurityTrustUrl(value);
      default:
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    }
  }

}
