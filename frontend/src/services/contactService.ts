import { Contact } from '../types/ContactProps';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchContactsService = async (): Promise<Contact[]> => {
    const url = `${BASE_URL}/contacts`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export const addContactService = async (
    contactData: { firstName: string; lastName: string; phoneNumber: string; }
): Promise<Contact> => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/contacts`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add contact.');
    }

    const newContact: Contact = await response.json();
    return newContact;
};

export const updateContactService = async (id: string, contactData: { firstName: string; lastName: string; phoneNumber: string; }): Promise<Contact> => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update contact: ${response.status}`);
    }

    const updatedContact: Contact = await response.json();
    return updatedContact;
};


export const deleteContactService = async (id: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.status}`);
    }
    return true;
};

