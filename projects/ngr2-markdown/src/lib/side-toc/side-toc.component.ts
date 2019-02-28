import {Component, Input, OnInit} from '@angular/core';
import {Ngr2MarkdownService, TOCItem} from '../ngr2-markdown.service';

@Component({
  selector: 'nb-side-toc',
  templateUrl: './side-toc.component.html',
  styleUrls: ['./side-toc.component.css']
})
export class SideTocComponent implements OnInit {
  @Input() currentHeading: string;
  @Input() themeColor = '#3f51b5';
  TOCInfo: TOCItem;
  constructor(
    private markdownService: Ngr2MarkdownService
  ) {
  }

  ngOnInit() {
    this.markdownService.currentHeading.subscribe({
      next: (value => {
        this.currentHeading = value;
      })
    });
    this.markdownService.TOCInfo.subscribe({
      next: (value => {
        this.TOCInfo = value;
        console.log(value);
      })
    });
  }
}
