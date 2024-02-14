import {LinkedListException} from "./LinkedListException";

export class DeleteException extends LinkedListException {
    constructor(message: string) {
        super(message);
    }

    static throw(message: string) {
        LinkedListException.throw('Remove exception: ' + message);
    }
}