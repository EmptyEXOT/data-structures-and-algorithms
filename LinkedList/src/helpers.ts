import {ListNode} from "./ListNode";

export function isNode<ItemType> (node: ItemType | ListNode<ItemType>): node is ListNode<ItemType> {
    return (node as ListNode<ItemType>).props !== undefined;
}