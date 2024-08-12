import request from 'supertest';
import express from 'express';
import { ContactController } from './contactController';
import { IContactService } from '../services/IContactService';

const mockContactService = (): IContactService => ({
    listContacts: jest.fn(),
    createContact: jest.fn(),
    updateContact: jest.fn(),
    deleteContact: jest.fn(),
});

const createApp = (contactService: IContactService) => {
    const app = express();
    app.use(express.json());
    const contactController = new ContactController(contactService);
    app.get('/contacts', contactController.getContacts);
    app.post('/contacts', contactController.createContact);
    app.put('/contacts/:id', contactController.updateContact);
    app.delete('/contacts/:id', contactController.deleteContact);
    return app;
};

describe('ContactController', () => {
    let app: express.Express;
    let contactService: IContactService;

    beforeEach(() => {
        contactService = mockContactService();
        app = createApp(contactService);
    });

    describe('GET /contacts', () => {
        it('should return all contacts', async () => {
            const contacts = [
                { id: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' },
            ];
            (contactService.listContacts as jest.Mock).mockReturnValue(contacts);

            const response = await request(app).get('/contacts');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(contacts);
        });

        it('should return a 404 error if contacts cannot be retrieved', async () => {
            (contactService.listContacts as jest.Mock).mockReturnValue(undefined);

            const response = await request(app).get('/contacts');
            expect(response.status).toBe(404);
            expect(response.body).toEqual("It was not possible to get contacts");
        });

    });

    describe('POST /contacts', () => {
        it('should create a new contact with valid data', async () => {
            const newContact = { id: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' };
            (contactService.createContact as jest.Mock).mockReturnValue({ success: true, contact: newContact });

            const response = await request(app)
                .post('/contacts')
                .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newContact);
        });

        it('should return a 400 error for invalid data', async () => {
            const errorResponse = { success: false, error: 'Invalid phone number format.', errorCode: 400 };
            (contactService.createContact as jest.Mock).mockReturnValue(errorResponse);

            const response = await request(app)
                .post('/contacts')
                .send({ firstName: 'John', lastName: 'Doe', phoneNumber: 'invalid-phone' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Invalid phone number format.' });
        });
    });

    describe('PUT /contacts/:id', () => {
        it('should update an existing contact', async () => {
            const updatedContact = { id: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' };
            (contactService.updateContact as jest.Mock).mockReturnValue({ success: true, contact: updatedContact });

            const response = await request(app)
                .put('/contacts/1')
                .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedContact);
        });

        it('should return a 404 error for non-existent contact', async () => {
            (contactService.updateContact as jest.Mock).mockReturnValue({ success: false, error: 'This contact was not found.', errorCode: 404 });

            const response = await request(app)
                .put('/contacts/1')
                .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'This contact was not found.' });
        });
    });

    describe('DELETE /contacts/:id', () => {
        it('should delete an existing contact', async () => {
            (contactService.deleteContact as jest.Mock).mockReturnValue({ success: true });

            const response = await request(app).delete('/contacts/1');
            expect(response.status).toBe(204);
            expect(response.text).toBe('');
            expect(contactService.deleteContact).toHaveBeenCalledWith('1');
        });

        it('should return a 404 error if contact does not exist', async () => {
            (contactService.deleteContact as jest.Mock).mockReturnValue({ success: false, error: 'This contact was not found.', errorCode: 404 });

            const response = await request(app).delete('/contacts/1');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'This contact was not found.' });
        });
    });
});
