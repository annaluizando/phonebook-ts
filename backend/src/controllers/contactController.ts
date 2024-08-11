import { Request, Response } from 'express';
import { IContactService } from '../services/IContactService';

export class ContactController {
    constructor(private contactService: IContactService) { }

    getContacts = (req: Request, res: Response) => {
        const contacts = this.contactService.listContacts();
        res.json(contacts);
    }

    createContact = (req: Request, res: Response) => {
        const { firstName, lastName, phoneNumber } = req.body;
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format. Please use a format like this: 999-999-9999.' });
        }

        if (!firstName || firstName.trim() === '' || !lastName || lastName.trim() === '') {
            return res.status(400).json({ message: 'Invalid inputs. All fields must be provided.' });
        }

        const contact = this.contactService.createContact(firstName, lastName, phoneNumber);
        res.status(201).json(contact);
    }

    updateContact = (req: Request, res: Response) => {
        const { firstName, lastName, phoneNumber } = req.body;
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format. Please use a format like this: 999-999-9999.' });
        }

        const updatedContact = this.contactService.updateContact(req.params.id, firstName, lastName, phoneNumber);
        if (!updatedContact) {
            return res.status(404).json({ message: 'This contact was not found.' })
        }
        res.json(updatedContact);
    }

    deleteContact = (req: Request, res: Response) => {
        this.contactService.deleteContact(req.params.id);
        res.status(204).send();
    };
}