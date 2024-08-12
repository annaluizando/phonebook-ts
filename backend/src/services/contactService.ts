import { v4 as uuid } from "uuid";
import { Contact, IContact } from "../models/IContact";
import { IContactRepository } from "../repositories/IContactRepository";
import { ContactResult, IContactService } from "./IContactService";

export class ContactService implements IContactService {
    constructor(private contactRepository: IContactRepository) { }

    listContacts(): IContact[] {
        return this.contactRepository.list();
    }

    createContact(firstName: string, lastName: string, phoneNumber: string): ContactResult {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            return { success: false, errorCode: 400, error: "Invalid phone number format. Please use a format like this: 999-999-9999." };
        }

        if (!firstName || firstName.trim() === '' || !lastName || lastName.trim() === '') {
            return { success: false, errorCode: 400, error: "Invalid input: Please provide valid first name, last name, and phone number." };
        }

        const newContact = new Contact(uuid(), firstName, lastName, phoneNumber);
        this.contactRepository.create(newContact);

        return { success: true, contact: newContact };
    }

    updateContact(id: string, firstName: string, lastName: string, phoneNumber: string): ContactResult {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            return { success: false, errorCode: 400, error: "Invalid phone number format. Please use a format like this: 999-999-9999." };
        }

        if (!firstName || firstName.trim() === '' || !lastName || lastName.trim() === '') {
            return { success: false, errorCode: 400, error: "Invalid input: Please provide valid first name, last name, and phone number." };
        }

        const existingContact = this.contactRepository.list().find(contact => contact.id === id);

        if (!existingContact) {
            return { success: false, errorCode: 404, error: `Contact with id ${id} not found` };
        }

        existingContact.firstName = firstName;
        existingContact.lastName = lastName;
        existingContact.phoneNumber = phoneNumber;

        this.contactRepository.update(id, existingContact);

        return { success: true, contact: existingContact };
    }

    deleteContact(id: string): ContactResult {
        const existingContact = this.contactRepository.list().find(contact => contact.id === id);

        if (!existingContact) {
            return { success: false, errorCode: 404, error: `Contact with id ${id} not found` };
        }

        this.contactRepository.delete(id);
        return { success: true };
    }
}