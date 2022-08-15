import { Router } from 'express';
import { validateUserProperties } from '../users/UserValidation';
import authController = require('./AuthController');

const router = Router();

// CREATE a new user
router.post(
    '/register',
    validateUserProperties,
    authController.register,
    authController.login
);

// LOGIN an existing user
router.post('/login', authController.login);

export default router;
