import {Nullable} from "./types";
import {IListNode, ListNode} from "./ListNode";
import {isNode} from "./helpers";
import {DeleteException} from "./Exceptions/DeleteException";
import {LinkedListException} from "./Exceptions/LinkedListException";

interface ILinkedList<ItemType> {
    head: Nullable<IListNode<ItemType>>,
    tail: Nullable<IListNode<ItemType>>,
    length: number,
}

export class LinkedList<ItemType> implements ILinkedList<ItemType> {
    head: Nullable<IListNode<ItemType>> = null;
    tail: Nullable<IListNode<ItemType>> = null;
    length: number = 0;

    constructor(...items: ItemType[]) {
        items.forEach(item => {
            this.pushBack(item);
        })
    }

    public pushBack(item: ItemType | ListNode<ItemType>): this {
        if (!isNode(item)) {
            const newNode = new ListNode(item, this.length, this.tail)
            this.length++
            if (!this.tail || !this.head) {
                this.tail = newNode
                this.head = newNode
                return this
            } else {
                const prevTail = this.tail;
                prevTail.next = newNode;
                this.tail = newNode;
                return this
            }
        } else {
            this.length++
            if (!this.tail || !this.head) {
                this.tail = item
                this.head = item
                return this
            } else {
                const prevTail = this.tail;
                item.prev = prevTail;
                prevTail.next = item;
                this.tail = item;
                return this
            }
        }
    }

    public findByProps(query: Partial<ItemType>) {
        const res: Array<IListNode<ItemType>> = [];
        let curr = this.head;
        while (curr) {
            let isValid = true
            for (let key in query) {
                if (curr.props[key] !== query[key]) {
                    isValid = false;
                    break
                }
            }
            if (isValid) res.push(curr);
            curr = curr.next
        }
        return res.length ? res : null;
    }

    public findByIdx(idx: number) {
        let currNode = this.head;
        while (currNode && currNode.idx !== idx) {
            currNode = currNode.next
        }
        if (currNode?.idx !== idx) return null;
        return currNode;
    }

    public forEach(cb: ((node: IListNode<ItemType>, idx: number) => void)) {
        let currNode: Nullable<IListNode<ItemType>> = this.head;
        let counter = 0;
        while (currNode) {
            cb(currNode, counter++);
            currNode = currNode.next
        }
    }

    public removeByIdx(idx: number) {
        const candidate = this.findByIdx(idx);
        if (candidate) {
            const prev = candidate.prev;
            const next = candidate.next;
            if (!next && prev && idx === this.length - 1) {
                prev.next = null;
                this.tail = prev;
                candidate.prev = null;
            } else if (!prev && next && idx === 0) {
                next.prev = null;
                this.head = next;
                candidate.next = null;
            } else if (prev && next) {
                prev.next = next;
                next.prev = prev;
            }
            this.forEach((node, idx) => {
                node.idx = idx
            })
            --this.length
        }
    }

    public removeFromIdx(idx: number, include: boolean) {
        if (idx === 0) throw new Error('Attempt to delete all nodes. Use clear() method instead');
        const from = this.findByIdx(idx);
        let curr = this.tail;
        if (from && curr) {
            while (curr && curr.idx !== from.idx) {
                const prev: Nullable<IListNode<ItemType>> = curr.prev;
                curr.next = null;
                curr.prev = null;
                curr = prev
            }
        }
        if (include) {

        }
    }


    public deleteInterval(idx: { from?: number, to?: number } = {}) {
        const tailIdx = this.length - 1;

        if (idx) {
            if (idx.to === undefined && idx.from === undefined) return (DeleteException.throw(`One of indexes should be passed`))
            if (idx.from && idx.to && idx.from > idx.to) DeleteException.throw(`idx.to must be greater then idx.from`)
            if ((idx.from !== undefined && idx.from <= 0) && idx.to === tailIdx || idx.to === 0 || (idx.to && idx.to > tailIdx)) DeleteException.throw(`Attempt to delete all nodes. Use clear() instead`)
            if (idx.from === tailIdx) DeleteException.throw(`Use pop() to delete last node`)
            if (idx.to === idx.from) DeleteException.throw(`Attempt to delete one node. Use deleteOne() instead`)
        }

        const from = idx.from ? this.findByIdx(idx.from) : this.head;
        const savePrev = from?.prev
        const to = idx.to ? this.findByIdx(idx.to) : this.tail
        const saveNext = to?.next;

        let curr = from;
        if (from && to && curr) {
            while (curr && curr.idx <= to.idx) {
                const next: Nullable<IListNode<ItemType>> = curr.next;
                curr.next = null;
                curr.prev = null;
                curr = next;
                --this.length
            }
            if (!idx.to || idx.to === tailIdx) {
                if (savePrev) {
                    this.tail = savePrev;
                    this.tail.next = null;
                } else return DeleteException.throw(`savePrev doesn't exist`);
            } else if (!idx.from || idx.from === tailIdx) {
                if (saveNext) {
                    this.head = saveNext;
                    this.head.prev = null;
                } else return DeleteException.throw(`savePrev doesn't exist`)
            } else if (idx.from && idx.to && savePrev && saveNext) {
                // savePrev.log({props: true})
                // saveNext.log({props: true})
                savePrev.next = saveNext;
                saveNext.prev = savePrev;
            }
        } else DeleteException.throw(`node with index (${idx.from} | ${idx.to}) doesn't exist`)
    }

    public splitByIdx(idx: number) {

    }
}






