import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { ContactService } from '../services/contactService';
import { ContactRepository } from '../repositories/contactRepository';

const router = Router();
const contactRepository = new ContactRepository();
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

router.get('/contacts', contactController.getContacts);
router.post('/contacts', contactController.createContact);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

export default router;