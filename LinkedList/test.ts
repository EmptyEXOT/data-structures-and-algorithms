import {LinkedList} from "."
import {ListNode} from ".";

type ItemType = {
    name: string,
    age: number,
}

const items: ItemType[] = [
    {
        name: 'alim',
        age: 22
    },
    {
        name: 'dima',
        age: 21
    },
    {
        name: 'roma',
        age: 18
    },
    {
        name: 'nikita',
        age: 32
    },
    {
        name: 'irina',
        age: 21
    },
]

const list = new LinkedList<ItemType>(...items)


list.pushBack({name: 'vasya', age: 43})

const newItem = new ListNode<ItemType>({name: 'anton', age: 56}, list.length, null, null)
list.pushBack(newItem);
// console.log(list.findByIdx(list.length-1)?.getPrev())

list.removeByIdx(1);


console.log(list.length)
// console.log(list.findByProps({name: 'vasya', age: 43}))

// console.log(list.findByIdx(4))

list.deleteInterval({from: 1, to: 3});

console.log(list.length)

list.forEach((item, idx) => {
    item.log({props: true})
})

