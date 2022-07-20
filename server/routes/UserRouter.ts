import { Router } from 'express';
import userController = require('../controllers/UserController');
import { authenticateUser } from '../middleware/Authentication';
import {
    validateUpdatedProperties,
    validateUserProperties,
} from '../middleware/UserValidation';

const router = Router();

// GET Data about the current user
router.get('/me', authenticateUser, userController.getCurrentUserData);

// GET data about the user with the specified userId
router.get('/:userId', userController.getUserData);

// CREATE a new user
router.post(
    '/signup',
    validateUserProperties,
    userController.register,
    userController.login
);

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
router.delete('/', authenticateUser, userController.deleteUser);

// Log the current user out

export default router;
