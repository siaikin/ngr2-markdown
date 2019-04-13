import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {filter} from 'rxjs/operators';

@Directive({
  selector: '[nbSyncScroll]'
})
export class SyncScrollDirective implements OnInit {

  static focusEl: HTMLElement;

  @HostListener('scroll', ['$event']) scroll = this.onScroll;
  @HostListener('mousewheel', ['$event']) mouseWheel = this.onMouseWheel;

  private _el: HTMLElement;

  constructor(private markdownService: Ngr2MarkdownService,
              private el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit(): void {
    this.markdownService.syncScroll
      .pipe(
        filter(el => {
          if (el) {
            // console.log(el.scrollTop / el.scrollHeight, this._el.scrollTop / this._el.scrollHeight);
          }
          if (
            el && (
              this._el !== el &&
              Math.abs((el.scrollTop / el.scrollHeight) - (this._el.scrollTop / this._el.scrollHeight)) > 0.01)
          ) {
            return true;
          }
        })
      )
      .subscribe((el: HTMLElement) => {
        const ratio = el.scrollTop / el.scrollHeight;
        this._el.scrollTop = this._el.scrollHeight * ratio;
        console.log(el.scrollTop / el.scrollHeight, this._el.scrollTop / this._el.scrollHeight);
      });
  }

  onScroll(event: Event) {
    this.markdownService.syncScroll.next(this._el);
  }

  onMouseWheel(event: Event) {
    SyncScrollDirective.focusEl = <HTMLElement> event.target;
  }
}
