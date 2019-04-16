import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {MarkdownMarker, MarkType} from '../core/markdown/markdownMarker';
import {MarkdownRenderer} from '../core/markdown/markdwonRenderer';
import {SyncScroll} from '../core/syncScroll';

@Component({
  selector: 'nb-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditBoxComponent implements OnInit {

  @ViewChild('editArea', {read: ElementRef}) editAreaRef: ElementRef;
  @ViewChild('editWindow', {read: ElementRef}) editWindowRef: ElementRef;

  private _editArea: HTMLElement;
  private _selection: Selection;
  private contentChange: Subject<string> = new Subject<string>();
  private marker: MarkdownMarker;
  private renderer: MarkdownRenderer;

  private get _range() { return this._selection.getRangeAt(0); }

  syncScroll: SyncScroll;

  set content(value: string) {
    if (!value || value.length <= 0) {
      this._editArea.innerHTML = '<div><br></div>';
    } else {
      this._editArea.innerText = value;
    }
  }
  get content(): string {
    return this._editArea.innerText.replace(/\n\n/g, '\n');
  }

  constructor(private markdownService: Ngr2MarkdownService
  ) {
  }

  ngOnInit() {
    this._editArea  = this.editAreaRef.nativeElement;
    this._editArea.focus();
    this._selection = document.getSelection();

    this.syncScroll = new SyncScroll(
      this.editWindowRef.nativeElement,
      'edit',
      (node, index) => index + '-' + ((node as HTMLElement).className.charCodeAt(1) - 48)
    );
    this.syncScroll.syncScrollByHeading('class');
    // const sk = new ShortcutKey(this._editArea);

    this.marker   = new MarkdownMarker();
    this.renderer = new MarkdownRenderer();

    this.bindMdService();
    this.bindMutationObserver();
  }

  keyUp(event: KeyboardEvent) {
    const text = this._range.startContainer.textContent;
    const type = this.marker.testMarks(text);

    switch (type) {
      case MarkType.HEADING:
        this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
        break;
      default:
        this.renderer.renderRange(this._range, type);
        break;
    }
  }

  paste(event: ClipboardEvent) {
    const text = event.clipboardData.getData('text');
    document.execCommand('insertText', false, text);
    const children = this._editArea.children;
    for (let i = 0; i < children.length; i++) {
      const type = this.marker.testMarks(children[i].textContent);

      switch (type) {
        case MarkType.HEADING:
          this.renderer.renderEl(children[i] as HTMLElement, type, this.marker.parseHeading(children[i].textContent));
          break;
        default:
          this.renderer.renderEl(children[i] as HTMLElement, type);
          break;
      }
    }
    this.syncScroll.updateHeadingsInfo();
    event.preventDefault();
  }
  /**
   * 订阅MarkdownService的一些Subject/Observable
   */
  private bindMdService(): void {
    // 订阅重置事件
    this.markdownService.observerResetMarkdown()
      .subscribe(md => {
        this._editArea.innerHTML = '<div><br></div>';
        this._editArea.focus();

        document.execCommand('insertText', false, md);
        const children = this._editArea.children;
        for (let i = 0; i < children.length; i++) {
          const type = this.marker.testMarks(children[i].textContent);

          switch (type) {
            case MarkType.HEADING:
              this.renderer.renderEl(children[i] as HTMLElement, type, this.marker.parseHeading(children[i].textContent));
              break;
            default:
              this.renderer.renderEl(children[i] as HTMLElement, type);
              break;
          }
        }
        this.syncScroll.updateHeadingsInfo();
        // this.content = md;
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
      return this.contentChange.asObservable();
    }
    return this.contentChange
      .pipe(
        distinctUntilChanged(),
        debounceTime(time)
      );
  }

  /**
   * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
   */
  private bindMutationObserver() {
    const _observer = new MutationObserver((mutations: Array<MutationRecord>, observer: MutationObserver) => {
      this.syncScroll.updateHeadingsInfo();
      this.contentChange.next(this.content);
    });

    _observer.observe(this._editArea, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true
    });
  }
}
