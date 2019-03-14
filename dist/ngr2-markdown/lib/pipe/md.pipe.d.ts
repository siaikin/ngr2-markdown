import { PipeTransform } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export declare class MdPipe implements PipeTransform {
    private markdownService;
    constructor(markdownService: Ngr2MarkdownService);
    transform(value: string, args?: any): any;
}
