import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {IndexedDB, IndexedDBEvent, IndexedDBEventType, IndexedDBStruct} from '../core/indexedDB/indexedDB';
import {Tree, TreeableNode} from '../core/tree/tree';
import {concatMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TreeNodeComponent} from '../tree/tree-node/tree-node.component';

@Component({
  selector: 'nb-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: [
    './file-browser.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FileBrowserComponent implements OnInit {

  /**
   * 输入框模板
   */
  private inputArea: HTMLInputElement;
  /**
   * 用于初始化的IndexedDB数据库结构
   */
  private indexedDBStructs: Array<IndexedDBStruct> = [
    {
      name: 'markdown_article',
      optionalParameters: {
        keyPath: 'id',
        autoIncrement: true
      },
      indexes: [
        {
          name: 'parentId',
          keyPath: 'parentId',
          options: {
            unique: false
          }
        }
      ]
    }
  ];
  private indexedDB: IndexedDB;
  /**
   * 被选择的节点
   */
  private selectedNode: {el: Element, data: TreeableNode};
  fileTree: Tree<TreeableNode>;

  constructor(private markdownService: Ngr2MarkdownService,
              private renderer: Renderer2
  ) {
    // 创建输入框模板
    const inputAreaLi: HTMLInputElement = renderer.createElement('LI');
    this.renderer.addClass(inputAreaLi, 'fb-li');
    this.renderer.addClass(inputAreaLi, 'fb-li_create');
    const inputAreaI: HTMLElement = renderer.createElement('I');
    this.renderer.addClass(inputAreaI, 'material-icons');
    this.renderer.addClass(inputAreaI, 'md-18');
    this.renderer.addClass(inputAreaI, 'md-dark');
    this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
    const inputAreaInput: HTMLElement = renderer.createElement('INPUT');
    this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
    this.renderer.appendChild(inputAreaLi, inputAreaI);
    this.renderer.appendChild(inputAreaLi, inputAreaInput);

    this.inputArea = inputAreaLi;
  }

  ngOnInit() {
    // 获取数据库实例
    IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
      .subscribe(db => {
        this.indexedDB = db;

        const store = this.indexedDB.getObjectStore('markdown_article', 'readwrite');
        // 数据库为空默认插入两条数据
        store.getCount()
          .pipe(
            concatMap(value => {
              if (value.data === 0) {
                return store.addAll([new Folder(), new Article()]);
              }
              return of(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1));
            })
          )
          .subscribe(value => {
            // 获取数据库中的所有文件
            this.refreshArticles().then(() => {
              // 找到最近修改的Article
              const currentFile = this.fileTree.recursionChildNodes(-1)
                .filter((file: TreeableNode) => file.type !== 'folder')
                .reduce(
                  (previousValue: Article, currentValue: Article) =>
                    previousValue.lastModifiedTime > currentValue.lastModifiedTime ? previousValue : currentValue
                );

              // 发送当前的Article
              this.markdownService.currentFile.next(currentFile);
              this.markdownService.reinitialization((currentFile as Article).content);
            });
          });
      });
  }

  createFile(): void {
    const prtId = this.selectedNode &&
      (this.selectedNode.data.type === 'folder' ? this.selectedNode.data.id : this.selectedNode.data.parentId) ||
      null;
    const parent = this.selectedNode &&
      (this.selectedNode.data.type === 'folder' ?
        this.selectedNode.el.parentElement.querySelector('ul') : this.selectedNode.el.parentElement.parentElement) ||
      null;

    const cloneEl = this.inputArea.cloneNode(true);

    if (!parent || !prtId || !cloneEl) { console.error('unable create file'); }

    this.renderer.listen(cloneEl, 'keyup', (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Enter':
          this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .add(new Article(prtId, 'article', 'ce', (<HTMLInputElement> ev.target).value))
            .subscribe(value => {
              this.refreshArticles();
              this.renderer.removeChild(parent, cloneEl);
            });
      }
    });
    this.renderer.appendChild(parent, cloneEl);
    (<HTMLElement> cloneEl).querySelector('input').focus();
  }

  createFolder(): void {
    if (this.selectedNode.data.type !== 'folder') { return; }

    const prtId = this.selectedNode &&
      this.selectedNode.data.id ||
      null;
    const parent = this.selectedNode &&
      this.selectedNode.el.parentElement.querySelector('ul') ||
      null;

    const cloneEl = this.inputArea.cloneNode(true);

    if (!parent || !prtId || !cloneEl) { console.error('unable create folder'); }

    this.renderer.listen(cloneEl, 'keyup', (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Enter':
          this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .add(new Folder(prtId, 'folder', (<HTMLInputElement> ev.target).value))
            .subscribe(value => {
              this.refreshArticles();
              this.renderer.removeChild(parent, cloneEl);
            });
      }
    });
    this.renderer.appendChild(parent, cloneEl);
    (<HTMLElement> cloneEl).querySelector('input').focus();
  }

  rename(): void {
    const parent = (this.selectedNode && this.selectedNode.el.parentElement) ||
      null;

    const type = this.selectedNode.data.type;

    const cloneEl = this.inputArea.cloneNode(true);

    this.renderer.listen(cloneEl, 'keyup', (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Enter':
          const value = (<HTMLInputElement> ev.target).value;
          this.selectedNode.data[type === 'folder' ? 'name' : 'title'] = value;
          this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .update(this.selectedNode.data)
            .subscribe(() => {
              this.refreshArticles();
              this.renderer.removeChild(parent, cloneEl);
              this.selectedNode = null;
            });
      }
    });
    parent.replaceChild(cloneEl, this.selectedNode.el);
    (<HTMLElement> cloneEl.lastChild).focus();
  }

  delete(): void {
    const children = this.fileTree.recursionChildNodes(this.selectedNode.data.id);
    this.indexedDB.getObjectStore('markdown_article', 'readwrite')
      .deleteAll(...children.map(value => value.id), this.selectedNode.data.id)
      .subscribe(value => this.refreshArticles());
  }

  close(): void {
    console.log('close');
  }

  select(el: HTMLElement, node: TreeableNode): void {

    if (this.selectedNode) {
      if (this.selectedNode.el === el) {
        this.selectedNode.el.classList.remove('fb-li_selected');
        this.selectedNode = null;
      } else {
        el.classList.add('fb-li_selected');
        this.selectedNode.el.classList.remove('fb-li_selected');
        this.selectedNode = {el, data: node};
      }
    } else {
      el.classList.add('fb-li_selected');
      this.selectedNode = {el, data: node};
    }
    console.log(this.selectedNode);
  }

  open(el: HTMLElement, node: TreeableNode): void {
    this._save(this.markdownService.currentFile.value);
    this.markdownService.reinitialization(node.content);
    this.markdownService.currentFile.next(node);
  }

  expanded(treeNode: TreeNodeComponent) {
    const data = <Folder> treeNode.data.data;
    data.isExpanded = treeNode.isExpanded;
    this.indexedDB.getObjectStore('markdown_article', 'readwrite')
      .update(data)
      .subscribe(value => console.log(value));
  }

  private _save(data: TreeableNode) {
    (data as Article).content = this.markdownService.originMd.value;
    this.indexedDB
      .getObjectStore('markdown_article', 'readwrite')
      .update(data)
      .subscribe(() => {
        this.refreshArticles();
        console.log('save success');
      });
  }
  private refreshArticles(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.indexedDB.getObjectStore('markdown_article', 'readwrite')
        .getAll<any>()
        .subscribe(value => {
          if (value.type === IndexedDBEventType.COMPLETE) {
            console.log(value);
            this.fileTree = new Tree(value.data);
            resolve(value);
          }
        }, error => reject(error));
    });
  }
}

export class Article implements TreeableNode {
  static AUTHOR   = 'Author';
  static TITLE    = 'Default Title';
  static CONTENT  = '# Default Title';

  id: number;
  parentId: number;
  type: string;
  author: string;
  title: string;
  content: string;
  createTime: Date;
  lastModifiedTime: Date;

  constructor(parentId: number  = -1,
              type: string      = 'article',
              author: string    = Article.AUTHOR,
              title: string     = Article.TITLE,
              content: string   = Article.CONTENT,
  ) {
    this.parentId         = parentId;
    this.type             = type;
    this.author           = author;
    this.title            = title;
    this.content          = content;
    this.createTime       = new Date();
    this.lastModifiedTime = this.createTime;
  }
}

export class Folder implements TreeableNode {
  static NAME = 'folderName';

  id: number;
  parentId: number;
  type: string;
  name: string;
  isExpanded: boolean;

  constructor(parentId: number    = -1,
              type: string        = 'folder',
              name: string        = Folder.NAME,
              isExpanded: boolean = true
  ) {
    this.parentId   = parentId;
    this.type       = type;
    this.name       = name;
    this.isExpanded = isExpanded;
  }
}
