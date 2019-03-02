import {Injectable} from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib/index';
import {BehaviorSubject, Observer} from 'rxjs';
import {MarkdownImpl, MarkdownOptionImpl} from '../core/markdown';

@Injectable({
  providedIn: 'root'
})
export class Ngr2MarkdownService {
  unitMap = {
    exist: false,
    child: {
      'b': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'c': {
        exist: false,
        child: {
          'i': {
            exist: true,
            child: {
            }
          },
          'p': {
            exist: true,
            child: {
            }
          }
        }
      },
      'h': {
        exist: false,
        child: {
          'c': {
            exist: true,
            child: {
            }
          },
          'l': {
            exist: true,
            child: {
              'r': {
                exist: true,
                child: {
                }
              }
            }
          },
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'i': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'm': {
        exist: false,
        child: {
          'e': {
            exist: true,
            child: {
              'r': {
                exist: true,
                child: {
                }
              }
            }
          },
          'm': {
            exist: true,
            child: {
            }
          },
          'c': {
            exist: true,
            child: {
            }
          }
        }
      },
      'n': {
        exist: false,
        child: {
          'i': {
            exist: true,
            child: {
              'm': {
                exist: false,
                child: {
                  'v': {
                    exist: true,
                    child: {
                    }
                  }
                }
              }
            }
          }
        }
      },
      'p': {
        exist: false,
        child: {
          'a': {
            exist: false,
            child: {
              'c': {
                exist: true,
                child: {
                }
              },
            }
          },
        }
      },
      'q': {
        exist: true,
        child: {
        }
      },
      't': {
        exist: false,
        child: {
          'p': {
            exist: true,
            child: {
            }
          }
        }
      },
      'w': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'x': {
        exist: false,
        child: {
          'a': {
            exist: false,
            child: {
              'm': {
                exist: false,
                child: {
                  'v': {
                    exist: true,
                    child: {
                    }
                  }
                }
              }
            }
          },
          'e': {
            exist: true,
            child: {
            }
          },
          'p': {
            exist: true,
            child: {
            }
          }
        }
      }
    }
  };
  markdownIt: MarkdownImpl;
  /**
   * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
   */
  currentHeading: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  /**
   * 发送目录信息的Subject
   */
  TOCInfo: BehaviorSubject<TOCItem> = new BehaviorSubject<TOCItem>(null);

  constructor() {
    this.markdownIt = new MarkdownImpl();
    this.markdownIt.use(this.anchor)
      .subscribe((value: Array<any>) => {
        const infoList = value.map((item) => {
          return new TOCItem(item.content, item.indentLevel);
        });
        const root = new TOCItem('root', 0);
        let TOCInfo = root;
        for (let i = 0; i < infoList.length; i++) {
          while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
            TOCInfo = TOCInfo.parent;
          }
          infoList[i].parent = TOCInfo;
          TOCInfo.children.push(infoList[i]);
          TOCInfo = infoList[i];
        }
        this.TOCInfo.next(root);
      });
  }

  render(markdown: string, options?: MarkdownOptionImpl): string {
    if (typeof markdown !== 'string') {
      markdown = '';
    }
    return this.markdownIt.render(markdown, options);
  }

  /**
   * Plugin: anchor
   * 这个方法向类型为heading_open的token添加id, 用于锚点定位
   * @param md - MarkdownIt instance
   * @param observer - use to push info
   */
  private anchor(md: MarkdownIt, observer: Observer<Array<any>>) {
    md.core.ruler.push('anchor', (state => {
      const infoList: Array<any> = new Array<any>();
      state.tokens.map((token, index, array) => {
        if (token.type === 'heading_open') {
          token.attrJoin('id', array[index + 1].content);
          infoList.push({
            content: token.attrGet('id'),
            indentLevel: token.markup.length
          });
        }
      });
      observer.next(infoList);
    }));
  }

  /**
   * 设置当前浏览的标题
   * @param heading - 标题标签的id
   */
  setCurrentHeading(heading: string): void {
    if (this.currentHeading.getValue() !== heading) {
      this.currentHeading.next(heading);
    }
  }

  checkUnit(str: string, unitMap: any = this.unitMap, caseSensitive?: boolean): {
    unit: string,
    number: number
  } {
    if (!unitMap || !str) { return; }
    if (!caseSensitive) { str = str.toLocaleLowerCase(); }
    let i: number, isMatch = false;
    for (i = str.length - 1; i >= 0; i--) {
      const ascii = str.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        isMatch = unitMap.exist;
        break;
      } else {
        if (!unitMap.child[str[i]]) { break; }
        unitMap = unitMap.child[str[i]];
      }
    }
    return isMatch ? {
      unit: str.substr(i + 1),
      number: Number.parseInt(str.substr(0, i + 1), 10)
    } : null;
  }
}

/**
 * 目录(TOC)生成的位置
 * start: TOC在内容左边
 * end: 右边
 */
type tocPos = 'left' | 'right';

export class MarkdownOption {
  anchor: boolean;
  TOC: boolean;
  direction: tocPos;
  /**
   * container height property
   */
  height: string;
  /**
   * container toc active color property
   */
  themeColor: string;
  bodyClassName: string;

  constructor(anchor: boolean = false,
              TOC: boolean = false,
              direction: tocPos = 'left',
              height: string = '800px',
              themeColor: string = '#3f51b5',
              bodyClassName: string = 'markdown-body'
  ) {
    this.anchor = anchor;
    this.TOC = TOC;
    this.direction = direction;
    this.height = height;
    this.themeColor = themeColor;
    this.bodyClassName = bodyClassName;
  }
}

export class TOCItem {
  content: string;
  indentLevel: number;
  parent: TOCItem;
  children: Array<TOCItem>;

  constructor(content: string, indentLevel: number) {
    this.content = content;
    this.indentLevel = indentLevel;
    this.children = new Array<TOCItem>();
  }
}
