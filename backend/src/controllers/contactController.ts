import { Request, Response } from 'express';
import { IContactService } from '../services/IContactService';

export class ContactController {
    constructor(private contactService: IContactService) { }

    getContacts = (req: Request, res: Response) => {
        const contacts = this.contactService.listContacts();

        if (!contacts) {
            return res.status(404).json('It was not possible to get contacts');
        }

        res.json(contacts);
    }

    createContact = (req: Request, res: Response) => {
        const { firstName, lastName, phoneNumber } = req.body;
        const result = this.contactService.createContact(firstName, lastName, phoneNumber);

        if (!result.success) {
            return res.status(result.errorCode || 500).json({ message: result.error });
        }

        res.status(201).json(result.contact);
    }

    updateContact = (req: Request, res: Response) => {
        const { firstName, lastName, phoneNumber } = req.body;
        const result = this.contactService.updateContact(req.params.id, firstName, lastName, phoneNumber);

        if (!result.success) {
            return res.status(result.errorCode || 500).json({ message: result.error });
        }

        res.json(result.contact);
    }

    deleteContact = (req: Request, res: Response) => {
        const result = this.contactService.deleteContact(req.params.id);

        if (!result.success) {
            return res.status(result.errorCode || 500).json({ message: result.error });
        }

        res.status(204).send();
    };
}