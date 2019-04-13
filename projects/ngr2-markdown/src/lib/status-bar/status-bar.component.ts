import { Component, OnInit } from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'nb-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  mdInfo;
  htmlInfo;

  constructor(private markdownService: Ngr2MarkdownService
  ) {
  }

  ngOnInit() {
    this.markdownService.observeMarkdown()
      .subscribe(allinfo => {
        this.mdInfo   = allinfo.Markdown;
        this.htmlInfo = allinfo.HTML;
      });
  }

}
