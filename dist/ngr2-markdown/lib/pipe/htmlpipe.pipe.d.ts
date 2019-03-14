import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
export declare class HTMLPipePipe implements PipeTransform {
    private domSanitizer;
    constructor(domSanitizer: DomSanitizer);
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param value - html content html内容
     * @param args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return - transformed html content html变换后的内容
     */
    transform(value: any, ...args: any[]): SafeHtml | SafeUrl;
}
