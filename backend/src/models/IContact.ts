export interface IContact {
    readonly id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export class Contact implements IContact {
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
    ) { }
}