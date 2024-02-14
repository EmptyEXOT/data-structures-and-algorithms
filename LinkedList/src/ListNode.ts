import {Nullable} from "./types";

interface LogConfig {
    props?: boolean,
    idx?: boolean,
    next?: boolean,
    prev?: boolean,
}

export interface IListNode<ItemType> {
    idx: number,
    props: ItemType,
    next: Nullable<IListNode<ItemType>>,
    prev: Nullable<IListNode<ItemType>>
    setProps: (node: Partial<ItemType>) => IListNode<ItemType>,
    log: (cfg?: LogConfig) => void,
    getPrev: () => Nullable<IListNode<ItemType>>,
    getNext: () => Nullable<IListNode<ItemType>>
}

export class ListNode<ItemType> implements IListNode<ItemType> {
    private _idx: number
    next: Nullable<IListNode<ItemType>>;
    prev: Nullable<IListNode<ItemType>>;
    props: ItemType;

    constructor(
        item: ItemType,
        idx: number,
        prev?: Nullable<IListNode<ItemType>>,
        next?: Nullable<IListNode<ItemType>>
    ) {
        this.props = item;
        this.prev = prev || null;
        this.next = next || null;
        this._idx = idx
    }

    log(cfg?: LogConfig) {
        const logObj: Partial<{
            props: ItemType,
            prev: ItemType,
            next: ItemType,
            idx: number
        }> = {}
        if (!cfg) {
            console.log(JSON.stringify({
                props: this.props,
                idx: this._idx,
                next: this.next?.props || null,
                prev: this.prev?.props || null,
            }, null, 2))
            return;
        }

        if (cfg.idx) logObj.idx = this._idx;
        if (cfg.props) logObj.props = this.props;
        if (cfg.prev) logObj.prev = this.prev?.props;
        if (cfg.next) logObj.next = this.next?.props;

        console.log(JSON.stringify(logObj, null, 2))
    }

    setProps(props: Partial<ItemType>): this {
        this.props = {...this.props, props};
        return this
    }

    get idx() {
        return this._idx
    }

    set idx(idx: number) {
        this._idx = idx;
    }

    public getNext() {
        if (this.next) return this.next
        return null;
    }

    public getPrev() {
        if (this.prev) return this.prev
        return null
}
}
