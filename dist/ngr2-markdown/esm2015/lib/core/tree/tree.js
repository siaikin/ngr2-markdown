/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
export class Tree {
    /**
     * @param {?} nodes
     */
    constructor(nodes) {
        this.nodes = nodes;
        this.nodeMap = {};
        this.initMap();
        this.rootNode = this.generateTree();
    }
    /**
     * 生成key: 父节点id, value: 父节点id为key的节点的Map
     * @private
     * @return {?}
     */
    initMap() {
        for (let i = 0; i < this.nodes.length; i++) {
            /** @type {?} */
            const node = this.nodes[i];
            if (!this.nodeMap[node.parentId]) {
                this.nodeMap[node.parentId] = [];
            }
            this.nodeMap[node.parentId].push(node);
        }
    }
    /**
     * @private
     * @param {?=} id
     * @param {?=} data
     * @param {?=} parentId
     * @param {?=} type
     * @return {?}
     */
    generateTree(id = -1, data, parentId = -1, type = 'root') {
        /** @type {?} */
        const node = new TreeNode();
        node.id = id;
        node.data = data;
        node.parentId = parentId;
        node.type = type;
        node.children = [];
        /** @type {?} */
        const children = this.nodeMap[id];
        if (!children) {
            return node;
        }
        for (let i = 0; i < children.length; i++) {
            node.push(this.generateTree(children[i].id, children[i], id, children[i].type));
        }
        return node;
    }
    /**
     * @param {?} parentId
     * @return {?}
     */
    recursionChildNodes(parentId) {
        if (!this.nodeMap[parentId]) {
            return [];
        }
        /** @type {?} */
        const arr = [];
        for (let i = 0; i < this.nodeMap[parentId].length; i++) {
            /** @type {?} */
            const node = this.nodeMap[parentId][i];
            arr.push(node);
            arr.push(...this.recursionChildNodes(node.id));
        }
        return arr;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    Tree.prototype.nodeMap;
    /**
     * @type {?}
     * @private
     */
    Tree.prototype.nodes;
    /** @type {?} */
    Tree.prototype.rootNode;
}
/**
 * @template T
 */
export class TreeNode {
    /**
     * @param {?=} id
     * @param {?=} parentId
     * @param {?=} type
     * @param {?=} data
     */
    constructor(id, parentId, type, data) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this.data = data;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    push(node) {
        this.children.push(node);
        return node;
    }
}
if (false) {
    /** @type {?} */
    TreeNode.prototype.id;
    /** @type {?} */
    TreeNode.prototype.parentId;
    /** @type {?} */
    TreeNode.prototype.type;
    /** @type {?} */
    TreeNode.prototype.children;
    /** @type {?} */
    TreeNode.prototype.data;
}
/**
 * @record
 */
export function TreeableNode() { }
if (false) {
    /** @type {?} */
    TreeableNode.prototype.id;
    /** @type {?} */
    TreeableNode.prototype.parentId;
    /** @type {?} */
    TreeableNode.prototype.type;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS90cmVlL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sT0FBTyxJQUFJOzs7O0lBTWYsWUFBWSxLQUFlO1FBRXpCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUtPLE9BQU87UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2tCQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUFFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7Ozs7OztJQUVPLFlBQVksQ0FBQyxLQUFhLENBQUMsQ0FBQyxFQUFFLElBQVEsRUFBRSxXQUFtQixDQUFDLENBQUMsRUFBRSxPQUFlLE1BQU07O2NBQ3BGLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBSztRQUM5QixJQUFJLENBQUMsRUFBRSxHQUFTLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFPLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFPLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Y0FFYixRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxRQUFnQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUFFLE9BQU8sRUFBRSxDQUFDO1NBQUU7O2NBQ3JDLEdBQUcsR0FBRyxFQUFFO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDaEQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0Y7Ozs7OztJQXBEQyx1QkFBNkM7Ozs7O0lBQzdDLHFCQUF3Qjs7SUFDeEIsd0JBQXNCOzs7OztBQW9EeEIsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFRbkIsWUFBWSxFQUFXLEVBQ1gsUUFBaUIsRUFDakIsSUFBYSxFQUNiLElBQVE7UUFFbEIsSUFBSSxDQUFDLEVBQUUsR0FBUyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsSUFBaUI7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7OztJQXJCQyxzQkFBVzs7SUFDWCw0QkFBaUI7O0lBQ2pCLHdCQUFhOztJQUNiLDRCQUE2Qjs7SUFDN0Isd0JBQVE7Ozs7O0FBbUJWLGtDQUtDOzs7SUFKQywwQkFBVzs7SUFDWCxnQ0FBaUI7O0lBQ2pCLDRCQUFhIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRyZWU8VCBleHRlbmRzIFRyZWVhYmxlTm9kZT4ge1xyXG5cclxuICBwcml2YXRlIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogQXJyYXk8VD4gfTtcclxuICBwcml2YXRlIG5vZGVzOiBBcnJheTxUPjtcclxuICByb290Tm9kZTogVHJlZU5vZGU8VD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5vZGVzOiBBcnJheTxUPlxyXG4gICkge1xyXG4gICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG5cclxuICAgIHRoaXMubm9kZU1hcCA9IHt9O1xyXG4gICAgdGhpcy5pbml0TWFwKCk7XHJcbiAgICB0aGlzLnJvb3ROb2RlID0gdGhpcy5nZW5lcmF0ZVRyZWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+aIkGtleTog54i26IqC54K5aWQsIHZhbHVlOiDniLboioLngrlpZOS4umtleeeahOiKgueCueeahE1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdE1hcCgpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBub2RlID0gdGhpcy5ub2Rlc1tpXTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5ub2RlTWFwW25vZGUucGFyZW50SWRdKSB7IHRoaXMubm9kZU1hcFtub2RlLnBhcmVudElkXSA9IFtdOyB9XHJcbiAgICAgIHRoaXMubm9kZU1hcFtub2RlLnBhcmVudElkXS5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVRyZWUoaWQ6IG51bWJlciA9IC0xLCBkYXRhPzogVCwgcGFyZW50SWQ6IG51bWJlciA9IC0xLCB0eXBlOiBzdHJpbmcgPSAncm9vdCcpOiBUcmVlTm9kZTxUPiB7XHJcbiAgICBjb25zdCBub2RlID0gbmV3IFRyZWVOb2RlPFQ+KCk7XHJcbiAgICBub2RlLmlkICAgICAgID0gaWQ7XHJcbiAgICBub2RlLmRhdGEgICAgID0gZGF0YTtcclxuICAgIG5vZGUucGFyZW50SWQgPSBwYXJlbnRJZDtcclxuICAgIG5vZGUudHlwZSAgICAgPSB0eXBlO1xyXG4gICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5ub2RlTWFwW2lkXTtcclxuICAgIGlmICghY2hpbGRyZW4pIHsgcmV0dXJuIG5vZGU7IH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5vZGUucHVzaCh0aGlzLmdlbmVyYXRlVHJlZShjaGlsZHJlbltpXS5pZCwgY2hpbGRyZW5baV0sIGlkLCBjaGlsZHJlbltpXS50eXBlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHJlY3Vyc2lvbkNoaWxkTm9kZXMocGFyZW50SWQ6IG51bWJlcik6IEFycmF5PFQ+IHtcclxuICAgIGlmICghdGhpcy5ub2RlTWFwW3BhcmVudElkXSkgeyByZXR1cm4gW107IH1cclxuICAgIGNvbnN0IGFyciA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVNYXBbcGFyZW50SWRdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGVNYXBbcGFyZW50SWRdW2ldO1xyXG4gICAgICBhcnIucHVzaChub2RlKTtcclxuICAgICAgYXJyLnB1c2goLi4udGhpcy5yZWN1cnNpb25DaGlsZE5vZGVzKG5vZGUuaWQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGU8VCBleHRlbmRzIFRyZWVhYmxlTm9kZT4gaW1wbGVtZW50cyBUcmVlYWJsZU5vZGUge1xyXG5cclxuICBpZDogbnVtYmVyO1xyXG4gIHBhcmVudElkOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxUcmVlTm9kZTxUPj47XHJcbiAgZGF0YTogVDtcclxuXHJcbiAgY29uc3RydWN0b3IoaWQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgcGFyZW50SWQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgdHlwZT86IHN0cmluZyxcclxuICAgICAgICAgICAgICBkYXRhPzogVFxyXG4gICkge1xyXG4gICAgdGhpcy5pZCAgICAgICA9IGlkO1xyXG4gICAgdGhpcy5wYXJlbnRJZCA9IHBhcmVudElkO1xyXG4gICAgdGhpcy50eXBlICAgICA9IHR5cGU7XHJcbiAgICB0aGlzLmRhdGEgICAgID0gZGF0YTtcclxuICB9XHJcblxyXG4gIHB1c2gobm9kZTogVHJlZU5vZGU8VD4pOiBUcmVlTm9kZTxUPiB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gobm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJlZWFibGVOb2RlIHtcclxuICBpZDogbnVtYmVyO1xyXG4gIHBhcmVudElkOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIFtrZXk6IHN0cmluZ106IGFueTtcclxufVxyXG4iXX0=