import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {SyncScroll} from '../core/syncScroll';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[nbSyncScroll]'
})
export class SyncScrollDirective implements OnInit, OnDestroy {

  static mutexLock = false;

  @HostListener('scroll', ['$event']) scroll = this.onScroll;

  @Input() syncScrollInfo: SyncScroll;

  private _el: HTMLElement;
  private subscription: Subscription;

  constructor(private markdownService: Ngr2MarkdownService,
              el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit(): void {
    this.subscription = this.markdownService.syncScroll
      .subscribe((value) => {
        if (!value || value.headingInfo.el === this._el) { return; }

        const curHeading = this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
        const deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
        this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onScroll(event: Event) {
    if (SyncScrollDirective.mutexLock) {
      SyncScrollDirective.mutexLock = false;
    } else {
    this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
      SyncScrollDirective.mutexLock = true;
    }
  }
}
