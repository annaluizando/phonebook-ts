import { IContact } from "../models/IContact";
import { IContactRepository } from "./IContactRepository";

export class ContactRepository implements IContactRepository {
    constructor(private contacts: IContact[] = []) { };

    list(): IContact[] {
        return this.contacts;
    }

    create(contact: IContact): void {
        this.contacts.push(contact);
    }

    update(id: string, updatedContact: Partial<IContact>): boolean {
        const index = this.contacts.findIndex((contact) => contact.id === id);
        if (index !== -1) {
            this.contacts[index] = {
                ...this.contacts[index],
                ...updatedContact,
                id: this.contacts[index].id,
            };
            return true
        }
        return false
    }

    delete(id: string): boolean {
        const index = this.contacts.findIndex((contact) => contact.id === id);
        if (index !== -1) {
            this.contacts = this.contacts.filter((contact) => contact.id !== id);
            return true
        }
        return false
    }
}