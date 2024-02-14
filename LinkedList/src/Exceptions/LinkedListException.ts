export class LinkedListException extends Error {
    constructor(message: string) {
        super(message);
    }

    static throw(message: string) {
        throw new Error('Linked List exception: ' + message)
    }
}