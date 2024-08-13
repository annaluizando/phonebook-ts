import { useState, useCallback } from 'react';
import { Contact } from '../types/ContactProps';
import { fetchContactsService, addContactService, deleteContactService, updateContactService } from '@services/contactService';
import useErrorHandler from './useErrorHandler';

const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { handleError } = useErrorHandler();

    const fetchContacts = useCallback(async () => {
        const data = await fetchContactsService().catch((e) => { throw new Error(e) });
        setContacts(data);
    }, []);

    const addContact = async (contactData: Omit<Contact, 'id'>) => {
        if (!contactData.firstName || !contactData.lastName || !contactData.phoneNumber) {
            handleError(new Error('All fields are required to add a contact.'), 'An unknown error occurred.');
            return;
        }

        const newContact = await addContactService(contactData)
            .catch((e) => { throw new Error(e) });

        return newContact;
    };

    const updateContact = async (id: string, contactData: Omit<Contact, 'id'>) => {
        if (!id) {
            handleError(new Error('Contact ID is required for updating the contact.'), 'An unknown error occurred.');
            return;
        }
        if (!contactData.firstName || !contactData.lastName || !contactData.phoneNumber) {
            handleError(new Error('All fields are required to update the contact.'), 'An unknown error occurred.');
            return;
        }

        const updatedContact = await updateContactService(id, contactData).catch((e) => { throw new Error(e) });
        return updatedContact;
    };
    const deleteContact = async (id: string) => {
        const deleted = await deleteContactService(id)
            .catch((e) => { throw new Error(e) });
        await fetchContacts();

        return deleted;
    };

    return { contacts, setContacts, fetchContacts, addContact, updateContact, deleteContact };
};

export default useContacts;