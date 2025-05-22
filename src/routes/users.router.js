import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { createCustomError } from '../utils/errorHandler.js';

const router = Router();

router.get('/', usersController.getAllUsers);

router.get('/:uid', usersController.getUser);

router.put('/:uid', usersController.updateUser);

router.delete('/:uid', usersController.deleteUser);

// Endpoint para simular un error personalizado
router.post('/mock-error', (req, res, next) => {
  return next(createCustomError('USER_EXISTS'));
});

export default router;