export class SyncScroll {

  private _el: HTMLElement;
  queryString: string;
  headingsInfo: Array<{
    id: string,
    pairId: string,
    el: HTMLElement,
    offsetTop: number,
    height: number
  }>;
  suffix: string;

  generateId: (node: Node, index: number, nodeList: NodeListOf<Node>) => string;

  constructor(el: HTMLElement,
              suffix: string,
              generateIdFun: (node: Node, index: number, nodeList: NodeListOf<Node>) => string = node => (node as HTMLElement).id) {
    this._el          = el;
    this.suffix       = suffix;
    this.generateId   = generateIdFun;

    this.headingsInfo = [];
  }

  syncScrollByHeading(headingElType: 'tag' | 'class' = 'tag',
                      headingKeys: Array<string> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {

    switch (headingElType) {
      case 'class':
        this.queryString = headingKeys.map(value => '.' + value).join(',');
        break;
      case 'tag':
      default:
        this.queryString = headingKeys.join(',');
    }

    this._update(this.queryString);
  }

  updateHeadingsInfo() {
    this._update(this.queryString);
  }

  currentHeading(scrollTop: number = this._el.scrollTop): {
    headingInfo: {
      id: string,
      pairId: string,
      el: HTMLElement,
      offsetTop: number,
      height: number
    },
    scrollTop: number
  } {
    if (this.headingsInfo) { return this._curHeading(scrollTop); }
    return null;
  }

  getPairHeading(pairId: string): {
    headingInfo: {
      id: string,
      pairId: string,
      el: HTMLElement,
      offsetTop: number,
      height: number
    },
    scrollTop: number
  } {
    for (let i = 0; i < this.headingsInfo.length; i++) {
      if (this.headingsInfo[i].pairId === pairId) {
        return {
          headingInfo: this.headingsInfo[i],
          scrollTop: this._el.scrollTop
        };
      }
    }
    return null;
  }

  private _curHeading(scrollTop: number): {
    headingInfo: {
      id: string,
      pairId: string,
      el: HTMLElement,
      offsetTop: number,
      height: number
    },
    scrollTop: number
  } {
    if (this.headingsInfo.length <= 0) { return null; }

    const el = this.headingsInfo.reduce((previousValue, currentValue) => {
      if (currentValue.offsetTop > scrollTop) {
        return previousValue;
      }
      if ((scrollTop - previousValue.offsetTop) > (scrollTop - currentValue.offsetTop)) {
        return currentValue;
      } else {
        return previousValue;
      }
    });

    return {
      headingInfo: el,
      scrollTop: scrollTop
    };
  }

  private _update(queryString: string) {
    const nodeList = this._el.querySelectorAll(queryString);

    if (!nodeList || nodeList.length <= 0) { return; }

    this.headingsInfo = [];

    for (let i = 0; i < nodeList.length; i++) {
      const curNode = nodeList[i] as HTMLElement;
      const nextNodeOffset = (i + 1) >= nodeList.length ? this._el.scrollHeight : (nodeList[i + 1] as HTMLElement).offsetTop;

      const pairId = this.generateId(curNode, i, nodeList);

      this.headingsInfo.push({
        id: pairId + '-' + this.suffix,
        pairId: pairId,
        el: curNode,
        offsetTop: curNode.offsetTop,
        height: nextNodeOffset - curNode.offsetTop
      });
    }
  }
}
