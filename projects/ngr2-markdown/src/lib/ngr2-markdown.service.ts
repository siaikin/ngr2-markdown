import {Injectable} from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib/index';
import * as hljs from 'highlight.js';
import {BehaviorSubject} from 'rxjs';

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
  MarkdownIt: MarkdownIt;
  /**
   * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
   */
  currentHeading: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  /**
   * 发送目录信息的Subject
   */
  TOCInfo: BehaviorSubject<TOCItem> = new BehaviorSubject<TOCItem>(null);

  constructor() {
    this.MarkdownIt = new MarkdownIt({
      highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str).value +
              '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + this.MarkdownIt.utils.escapeHtml(str) + '</code>';
      }
    });
    this.MarkdownIt.use(this.anchor, (value) => this.TOCInfo.next(value));
  }

  toggle(options: MarkdownOption) {
    options.anchor ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
    options.TOC ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
  }

  /**
   * render markdown text function
   * 渲染函数
   * @param markdown - markdown format text - markdown格式的文本
   * @return - return transformation html - 返回渲染后的html
   */
  render(markdown: string): string {
    if (typeof markdown !== 'string') {
      markdown = '';
    }
    return this.MarkdownIt.render(markdown);
  }

  /**
   * 这个方法向类型为heading_open的token添加id, 用于锚点定位
   * 并提取id和标题等级
   * 使用方法见this.init()
   * @param md - MarkdownIt instance
   * @param callBack - callBack function look this.init()
   */
  private anchor(md: MarkdownIt, callBack: (value: TOCItem) => void) {
    let rootTOCInfo = new TOCItem('root', 0);
    md.core.ruler.push('anchor', (state) => {
      const infoList: Array<TOCItem> = new Array<TOCItem>();
      state.tokens.map((token, index, array) => {
        if (token.type === 'heading_open') {
          token.attrJoin('id', array[index + 1].content);
          infoList.push(new TOCItem(token.attrGet('id'), token.markup.length));
        }
      });

      rootTOCInfo = new TOCItem('root', 0);
      let TOCInfo = rootTOCInfo;
      for (let i = 0; i < infoList.length; i++) {
        while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
          TOCInfo = TOCInfo.parent;
        }
        infoList[i].parent = TOCInfo;
        TOCInfo.children.push(infoList[i]);
        TOCInfo = infoList[i];
      }
      callBack(rootTOCInfo);
    });
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

  checkUnit(unitMap: any, str: string, caseSensitive?: boolean): {
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

export class MarkdownOption {
  anchor: boolean;
  TOC: boolean;
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
