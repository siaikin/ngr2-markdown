import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {ShortcutKey} from '../core/shortcutKey/shortcutKey';

@Component({
  selector: 'nb-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.css']
})
export class EditBoxComponent implements OnInit {

  private _el: HTMLElement;
  private _editArea: HTMLElement;
  private mdSubject: Subject<string> = new Subject<string>();

  set text (value: string) {
    this._editArea.innerText = value;
  }
  get text (): string {
    return this._editArea.innerText;
  }

  constructor(private markdownService: Ngr2MarkdownService,
              el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this._editArea = this._el.querySelector('#editArea');
    this._editArea.focus();

    const sk = new ShortcutKey(this._editArea);

    this.bindMdService();
    this.bindMutationObserver();
  }

  /**
   * 订阅MarkdownService的一些Subject/Observable
   */
  private bindMdService(): void {
    this.markdownService.observerResetMarkdown()
      .subscribe(md => {
        this.text = md;
      });

    this.markdownService
      .updateMarkdown(this.observeText(200));
  }

  /**
   * 观察文本的变化
   * @param time - 延迟发出的时间
   */
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
      this.mdSubject.next(this.text);
    });

    _observer.observe(this._editArea, {
      subtree: true,
      childList: true,
      characterData: true,
      characterDataOldValue: true
    });
  }
}
