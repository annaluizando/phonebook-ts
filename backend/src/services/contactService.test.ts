import { ContactService } from './contactService';
import { IContactRepository } from '../repositories/IContactRepository';
import { Contact } from '../models/IContact';

const mockContactRepository = (): IContactRepository => ({
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

describe('ContactService', () => {
    let contactService: ContactService;
    let contactRepository: IContactRepository;

    beforeEach(() => {
        contactRepository = mockContactRepository();
        contactService = new ContactService(contactRepository);
    });

    describe('listContacts', () => {
        it('should return an array of contacts', () => {
            const contacts = [
                new Contact('1', 'John', 'Doe', '123-456-7890'),
                new Contact('2', 'Jane', 'Doe', '098-765-4321'),
            ];
            (contactRepository.list as jest.Mock).mockReturnValue(contacts);

            const result = contactService.listContacts();
            expect(result).toEqual(contacts);
        });
    });

    describe('createContact', () => {
        it('should create a new contact with valid data', () => {
            const id = '1';
            const newContact = new Contact(id, 'John', 'Doe', '123-456-7890');

            (contactRepository.create as jest.Mock).mockImplementation((contact: Contact) => contact);

            const result = contactService.createContact('John', 'Doe', '123-456-7890');

            expect(result.success).toBe(true);
            expect(result.contact).toMatchObject({
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '123-456-7890',
            });
            expect(contactRepository.create).toHaveBeenCalled();
        });

        it('should return an error for invalid phone number format', () => {
            const result = contactService.createContact('John', 'Doe', 'invalid-phone');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(400);
            expect(result.error).toBe('Invalid phone number format. Please use a format like this: 999-999-9999.');
        });

        it('should return an error for empty first or last name', () => {
            const result = contactService.createContact('', 'Doe', '123-456-7890');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(400);
            expect(result.error).toBe('Invalid input: Please provide valid first name, last name, and phone number.');
        });
    });


    describe('updateContact', () => {
        it('should update an existing contact', () => {
            const existingContact = new Contact('1', 'John', 'Doe', '123-456-7890');
            (contactRepository.list as jest.Mock).mockReturnValue([existingContact]);
            (contactRepository.update as jest.Mock).mockImplementation((id: string, contact: Contact) => contact);

            const result = contactService.updateContact('1', 'John', 'Smith', '123-456-7890');
            expect(result.success).toBe(true);
            expect(result.contact?.lastName).toBe('Smith');
            expect(contactRepository.update).toHaveBeenCalledWith('1', { ...existingContact, lastName: 'Smith' });
        });

        it('should return an error for non-existent contact', () => {
            (contactRepository.list as jest.Mock).mockReturnValue([]);

            const result = contactService.updateContact('1', 'John', 'Doe', '123-456-7890');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(404);
            expect(result.error).toBe('Contact with id 1 not found');
        });

        it('should return an error for invalid phone number format', () => {
            (contactRepository.list as jest.Mock).mockReturnValue([
                new Contact('1', 'John', 'Doe', '123-456-7890'),
            ]);

            const result = contactService.updateContact('1', 'John', 'Doe', '111-333-22');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(400);
            expect(result.error).toBe('Invalid phone number format. Please use a format like this: 999-999-9999.');
        });

        it('should return an error for empty first or last name', () => {
            (contactRepository.list as jest.Mock).mockReturnValue([
                new Contact('1', 'John', 'Doe', '123-456-7890'),
            ]);

            const result = contactService.updateContact('1', '', 'Doe', '123-456-7890');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(400);
            expect(result.error).toBe('Invalid input: Please provide valid first name, last name, and phone number.');
        });
    });

    describe('deleteContact', () => {
        it('should delete an existing contact', () => {
            (contactRepository.list as jest.Mock).mockReturnValue([new Contact('1', 'John', 'Doe', '123-456-7890')]);

            const result = contactService.deleteContact('1');
            expect(result.success).toBe(true);
            expect(contactRepository.delete).toHaveBeenCalledWith('1');
        });

        it('should return an error for non-existent contact', () => {
            (contactRepository.list as jest.Mock).mockReturnValue([]);

            const result = contactService.deleteContact('1');
            expect(result.success).toBe(false);
            expect(result.errorCode).toBe(404);
            expect(result.error).toBe('Contact with id 1 not found');
        });
    });
});
