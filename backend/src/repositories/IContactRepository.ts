import { IContact } from "../models/IContact";

export interface IContactRepository {
    list(): IContact[];
    create(contact: IContact): void;
    update(id: string, updateContact: IContact): boolean;
    delete(id: string): boolean;
}