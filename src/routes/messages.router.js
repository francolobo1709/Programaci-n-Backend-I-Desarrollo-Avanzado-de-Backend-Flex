import { Router } from 'express';
import * as messagesController from '../controllers/messages.controller.js';

const router = Router();

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
