import { IContact } from "../models/IContact";

export interface IContactService {
    listContacts(): IContact[];
    createContact(firstName: string, lastName: string, phoneNumber: string): ContactResult;
    updateContact(id: string, firstName: string, lastName: string, phoneNumber: string): ContactResult;
    deleteContact(id: string): ContactResult;
}

export interface ContactResult {
    success: boolean;
    contact?: IContact;
    error?: string;
    errorCode?: number;
}