import {ListNode} from "./ListNode";

export type Nullable<T> = T | null;

export type FILTER_PROPS<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base]

export type ItemKey<ItemType> = keyof ItemType;
export type PropType<ItemType, TProp extends keyof ItemType> = ItemType[TProp];

export type ItemKeys<ItemType> = {
    [key in keyof ItemType]: ItemType[key]
}

export type ItemOrNode<ItemType> = ItemType |  ListNode<ItemType>