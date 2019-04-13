export class Tree<T extends TreeableNode> {

  private nodeMap: { [key: number]: Array<T> };
  private nodes: Array<T>;
  rootNode: TreeNode<T>;

  constructor(nodes: Array<T>
  ) {
    this.nodes = nodes;

    this.nodeMap = {};
    this.initMap();
    this.rootNode = this.generateTree();
  }

  /**
   * 生成key: 父节点id, value: 父节点id为key的节点的Map
   */
  private initMap(): void {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (!this.nodeMap[node.parentId]) { this.nodeMap[node.parentId] = []; }
      this.nodeMap[node.parentId].push(node);
    }
  }

  private generateTree(id: number = -1, data?: T, parentId: number = -1, type: string = 'root'): TreeNode<T> {
    const node = new TreeNode<T>();
    node.id       = id;
    node.data     = data;
    node.parentId = parentId;
    node.type     = type;
    node.children = [];

    const children = this.nodeMap[id];
    if (!children) { return node; }

    for (let i = 0; i < children.length; i++) {
      node.push(this.generateTree(children[i].id, children[i], id, children[i].type));
    }
    return node;
  }

  recursionChildNodes(parentId: number): Array<T> {
    if (!this.nodeMap[parentId]) { return []; }
    const arr = [];
    for (let i = 0; i < this.nodeMap[parentId].length; i++) {
      const node = this.nodeMap[parentId][i];
      arr.push(node);
      arr.push(...this.recursionChildNodes(node.id));
    }
    return arr;
  }
}

export class TreeNode<T extends TreeableNode> implements TreeableNode {

  id: number;
  parentId: number;
  type: string;
  children: Array<TreeNode<T>>;
  data: T;

  constructor(id?: number,
              parentId?: number,
              type?: string,
              data?: T
  ) {
    this.id       = id;
    this.parentId = parentId;
    this.type     = type;
    this.data     = data;
  }

  push(node: TreeNode<T>): TreeNode<T> {
    this.children.push(node);
    return node;
  }
}

export interface TreeableNode {
  id: number;
  parentId: number;
  type: string;
  [key: string]: any;
}
