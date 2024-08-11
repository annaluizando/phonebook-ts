import { v4 as uuid } from "uuid";
import { Contact, IContact } from "../models/IContact";
import { IContactRepository } from "../repositories/IContactRepository";
import { IContactService } from "./IContactService";

export class ContactService implements IContactService {
    constructor(private contactRepository: IContactRepository) { }

    listContacts(): IContact[] {
        return this.contactRepository.list();
    }

    createContact(firstName: string, lastName: string, phoneNumber: string): IContact {
        const newContact = new Contact(uuid(), firstName, lastName, phoneNumber);
        this.contactRepository.create(newContact);
        return newContact;
    }

    updateContact(id: string, firstName: string, lastName: string, phoneNumber: string): IContact {
        const updatedContact = new Contact(id, firstName, lastName, phoneNumber);
        this.contactRepository.update(id, updatedContact);
        return updatedContact;
    }

    deleteContact(id: string): void {
        this.contactRepository.delete(id);
    }
}