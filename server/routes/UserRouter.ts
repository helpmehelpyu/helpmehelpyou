import { Router } from 'express';
import userController = require('../controllers/UserController');
import { authenticateUser } from '../middleware/Authentication';
import {
  validateUpdatedProperties,
  validateUserProperties,
} from '../middleware/UserValidation';

const router = Router();

// CREATE a new user
router.post('/signup', validateUserProperties, userController.register);

// LOGIN an existing user
router.post('/login', userController.login);

// UPDATE an existing user
router.patch(
  '/',
  authenticateUser,
  validateUpdatedProperties,
  userController.updateUserInfo
);

// DELETE an existing user
router.delete('/:userId', authenticateUser, userController.deleteUser);

export default router;
