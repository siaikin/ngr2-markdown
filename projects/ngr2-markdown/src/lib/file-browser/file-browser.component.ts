import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {IndexedDB, IndexedDBStore, IndexedDBStruct} from '../core/indexedDB/indexedDB';

@Component({
  selector: 'nb-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: [
    './file-browser.component.css'
  ]
})
export class FileBrowserComponent implements OnInit {

  @ViewChild('fileList', { read: ElementRef }) fileList: ElementRef;

  private inputArea: HTMLElement;
  private indexedDBStructs: Array<IndexedDBStruct> = [
    {
      name: 'markdown_article',
      optionalParameters: {
        keyPath: 'id',
        autoIncrement: true
      },
      indexes: [
        {
          name: 'title',
          keyPath: 'title',
          options: {
            unique: false
          }
        }
      ]
    }
  ];
  private indexedDB: IndexedDB;
  private selectedArticles: { [key: string]: {el: Element, data: Article} };
  private fileListArea: Element;
  private isConnect: boolean;
  articles: Array<Article>;

  constructor(private markdownService: Ngr2MarkdownService,
              private renderer: Renderer2
  ) {
    const inputAreaLi: HTMLElement = renderer.createElement('LI');
    this.renderer.addClass(inputAreaLi, 'fb-li');
    this.renderer.addClass(inputAreaLi, 'fb-li_create');
    // inputAreaLi.classList.add('fb-li', 'fb-li_create');
    const inputAreaI: HTMLElement = renderer.createElement('I');
    this.renderer.addClass(inputAreaI, 'material-icons');
    this.renderer.addClass(inputAreaI, 'md-18');
    this.renderer.addClass(inputAreaI, 'md-dark');
    // inputAreaI.classList.add('material-icons', 'md-18', 'md-dark');
    this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
    const inputAreaInput: HTMLElement = renderer.createElement('INPUT');
    this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
    // inputAreaDiv.classList.add('fb-li_create-input');
    this.renderer.setAttribute(inputAreaInput, 'contenteditable', 'true');
    this.renderer.appendChild(inputAreaLi, inputAreaI);
    this.renderer.appendChild(inputAreaLi, inputAreaInput);

    this.inputArea = inputAreaLi;
    /*tslint:disable-next-line*/
    this.isConnect = false;
    this.selectedArticles = {};
  }

  ngOnInit() {
    IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
      .subscribe(db => {
        this.indexedDB = db;
        this.isConnect = true;

        this.refreshArticles();
      });
    this.fileListArea = this.fileList.nativeElement;
  }

  createFile(): void {
    const cloneEl = this.inputArea.cloneNode(true);
    this.renderer.listen(cloneEl, 'keyup', (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Enter':
          this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .add(new Article('ce', (<HTMLInputElement> ev.target).value))
            .subscribe(value => {
              this.refreshArticles();
              this.renderer.removeChild(this.fileListArea, cloneEl);
            });
      }
    });
    this.renderer.appendChild(this.fileListArea, cloneEl);
  }

  createFolder(): void {
    console.log('createFolder');
  }

  rename(): void {
    const cloneEl = this.inputArea.cloneNode(true);
    const id = Object.getOwnPropertyNames(this.selectedArticles)[0];
    const selected = this.selectedArticles[id];
    this.renderer.listen(cloneEl, 'keyup', (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Enter':
          selected.data.title = (<HTMLInputElement> ev.target).value;
          this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .update(selected.data)
            .subscribe(value => {
              this.refreshArticles();
              this.renderer.removeChild(this.fileListArea, cloneEl);
              this.selectedArticles[id] = null;
            });
      }
    });
    this.fileListArea.replaceChild(cloneEl, selected.el);
    (<HTMLElement> cloneEl.lastChild).focus();
  }

  delete(): void {
    this.indexedDB.getObjectStore('markdown_article', 'readwrite')
      .deleteAll(
        ...Object.getOwnPropertyNames(this.selectedArticles)
          .map(value => this.selectedArticles[Number.parseInt(value, 10)].data.id)
      )
      .subscribe(value => this.refreshArticles());
  }

  close(): void {
    console.log('close');
  }

  select(el: HTMLElement, article: Article): void {
    console.log('select');
    if (!this.selectedArticles[article.id.toString(10)]) {
      this.selectedArticles[article.id.toString(10)] = {el, data: article};
      el.classList.add('fb-li_selected');
    } else {
      this.selectedArticles[article.id.toString(10)] = null;
      el.classList.remove('fb-li_selected');
    }
  }

  open(el: HTMLElement, article: Article): void {
    console.log('open');
    this.markdownService.reinitialization(article.content);
  }

  private refreshArticles(): void {
    this.indexedDB.getObjectStore('markdown_article', 'readwrite')
      .getAll<Article>()
      .subscribe(value => {
        this.articles = value.data;
      });
  }
}

class Article {
  static AUTHOR   = 'Author';
  static TITLE    = 'Default Title';
  static CONTENT  = '# Default Title';

  id: number;
  author: string;
  title: string;
  content: string;
  createTime: Date;
  lastModifiedTime: Date;

  constructor(author: string  = Article.AUTHOR,
              title: string   = Article.TITLE,
              content: string = Article.CONTENT
  ) {
    this.author           = author;
    this.title            = title;
    this.content          = content;
    this.createTime       = new Date();
    this.lastModifiedTime = this.createTime;
  }
}
