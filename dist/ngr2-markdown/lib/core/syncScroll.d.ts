export declare class SyncScroll {
    private _el;
    queryString: string;
    headingsInfo: Array<{
        id: string;
        pairId: string;
        el: HTMLElement;
        offsetTop: number;
        height: number;
    }>;
    suffix: string;
    generateId: (node: Node, index: number, nodeList: NodeListOf<Node>) => string;
    constructor(el: HTMLElement, suffix: string, generateIdFun?: (node: Node, index: number, nodeList: NodeListOf<Node>) => string);
    syncScrollByHeading(headingElType?: 'tag' | 'class', headingKeys?: Array<string>): void;
    updateHeadingsInfo(): void;
    currentHeading(scrollTop?: number): {
        headingInfo: {
            id: string;
            pairId: string;
            el: HTMLElement;
            offsetTop: number;
            height: number;
        };
        scrollTop: number;
    };
    getPairHeading(pairId: string): {
        headingInfo: {
            id: string;
            pairId: string;
            el: HTMLElement;
            offsetTop: number;
            height: number;
        };
        scrollTop: number;
    };
    private _curHeading;
    private _update;
}
