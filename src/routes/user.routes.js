import { Router } from 'express';
import { parseId } from '../middlewares/parseId.js';
import * as usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/',      usersController.getUsers);
router.get('/:id',   parseId, usersController.getUserById);
router.post('/',     usersController.createUser);
router.put('/:id',   parseId, usersController.updateUser);
router.delete('/:id', parseId, usersController.deleteUser);

export default router;