import { Pipe, PipeTransform } from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';

@Pipe({
  name: 'md'
})
export class MdPipe implements PipeTransform {

  constructor(private markdownService: Ngr2MarkdownService) {
  }

  transform(value: string, args?: any): any {
    return this.markdownService.render(value, {anchor: false});
  }

}
