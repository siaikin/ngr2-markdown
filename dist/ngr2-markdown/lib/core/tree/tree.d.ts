export declare class Tree<T extends TreeableNode> {
    private nodeMap;
    private nodes;
    rootNode: TreeNode<T>;
    constructor(nodes: Array<T>);
    /**
     * 生成key: 父节点id, value: 父节点id为key的节点的Map
     */
    private initMap;
    private generateTree;
    recursionChildNodes(parentId: number): Array<T>;
}
export declare class TreeNode<T extends TreeableNode> implements TreeableNode {
    id: number;
    parentId: number;
    type: string;
    children: Array<TreeNode<T>>;
    data: T;
    constructor(id?: number, parentId?: number, type?: string, data?: T);
    push(node: TreeNode<T>): TreeNode<T>;
}
export interface TreeableNode {
    id: number;
    parentId: number;
    type: string;
    [key: string]: any;
}
