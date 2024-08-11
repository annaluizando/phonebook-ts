import { IContact } from "../models/IContact";

export interface IContactService {
    listContacts(): IContact[];
    createContact(firstName: string, lastName: string, phoneNumber: string): IContact;
    updateContact(id: string, firstName: string, lastName: string, phoneNumber: string): IContact;
    deleteContact(id: string): void;
}   