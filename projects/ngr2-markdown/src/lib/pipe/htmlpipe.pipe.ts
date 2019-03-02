import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'html'
})
export class HTMLPipePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  /**
   * use DomSanitizer allow insert outside HTML
   * 使用DomSanitizer允许插入外部的HTML
   * @param value - html content html内容
   * @return - transformed html content html变换后的内容
   */
  transform(value: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
