import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export declare class HTMLPipePipe implements PipeTransform {
    private domSanitizer;
    constructor(domSanitizer: DomSanitizer);
    /**
     * use DomSanitizer preventing XSS
     * 使用DomSanitizer防止XSS
     * @param value - html content html内容
     * @return - transformed html content html变换后的内容
     */
    transform(value: any): SafeHtml;
}
