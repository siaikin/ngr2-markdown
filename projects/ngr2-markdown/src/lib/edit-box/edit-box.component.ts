import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {ShortcutKeyEvent} from '../core/shortcutKey/shortcutKeyEvent';

@Component({
  selector: 'nb-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.css']
})
export class EditBoxComponent implements OnInit {

  private _el: HTMLElement;
  private _editArea: HTMLElement;
  private mdSubject: Subject<string> = new Subject<string>();

  constructor(private markdownService: Ngr2MarkdownService,
              el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this._editArea = this._el.querySelector('#editArea');

    // const sk = new ShortcutKeyEvent(this._editArea);
    // sk.copy()
    //   .subscribe(value => console.log(value));

    this.markdownService.observerResetMarkdown()
      .subscribe(md => {
        this._editArea.innerText = md;
      });
    this.bindMdService();
    this.bindMutationObserver();
  }

  /**
   * 订阅MarkdownService的一些Subject/Observable
   */
  private bindMdService(): void {
    this.markdownService.observerResetMarkdown()
      .subscribe(md => {
        this._editArea.textContent = md;
      });

    this.markdownService
      .updateMarkdown(this.observeText(200));
  }

  private observeText(time?: number): Observable<string> {
    if (!time) {
      return this.mdSubject.asObservable();
    }
    return this.mdSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(time)
      );
  }

  /**
   * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
   */
  private bindMutationObserver() {
    const _observer = new MutationObserver((mutations: Array<MutationRecord>, observer: MutationObserver) => {
      this.mdSubject.next(this.getText());
    });

    _observer.observe(this._editArea, {
      subtree: true,
      childList: true,
      characterData: true,
      characterDataOldValue: true
    });
  }

  private getText(): string {
    return this._editArea.innerText;
  }
}
