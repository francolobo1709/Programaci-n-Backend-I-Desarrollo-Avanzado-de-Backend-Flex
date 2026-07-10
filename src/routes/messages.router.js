import { Router } from 'express';
import * as messagesController from '../controllers/messages.controller.js';
import { requireMongo } from '../middlewares/requireMongo.js';

const router = Router();

// Protege todos los endpoints de messages si MongoDB no está disponible
router.use(requireMongo);

// GET /api/messages
router.get('/', messagesController.getMessages);

// GET /api/messages/:mid
router.get('/:mid', messagesController.getMessageById);

// GET /api/messages/booking/:bid  — todos los mensajes de una reserva
router.get('/booking/:bid', messagesController.getMessagesByBooking);

// POST /api/messages
router.post('/', messagesController.createMessage);

// DELETE /api/messages/:mid
router.delete('/:mid', messagesController.deleteMessage);

export default router;
