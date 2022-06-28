import { Router } from 'express';
import { body } from 'express-validator';
import userController = require('../controllers/UserController');
import { authenticateUser } from '../middleware/Authentication';

const router = Router();

// CREATE a new user
router.post(
    '/signup',
    body('firstName').trim().isLength({ min: 1 }).isAlpha().escape(),
    body('lastName').trim().isLength({ min: 1 }).isAlpha().escape(),
    body('email').isEmail().normalizeEmail().escape(),
    body('password').isLength({ min: 6 }).isStrongPassword().escape(),
    body('phoneNumber').optional().isMobilePhone('any').escape(),
    userController.register
);

// LOGIN an existing user
router.post('/login', userController.login);

// UPDATE an existing user
router.patch(
    '/:userId',
    authenticateUser,
    userController.authorizeUser,
    body('firstName').trim().isLength({ min: 1 }).isAlpha().escape().optional(),
    body('lastName').trim().isLength({ min: 1 }).isAlpha().escape().optional(),
    body('email').isEmail().normalizeEmail().escape().optional(),
    body('password')
        .isLength({ min: 6 })
        .isStrongPassword()
        .escape()
        .optional(),
    body('phoneNumber').optional().isMobilePhone('any').escape(),
    userController.updateUserInfo
);

// DELETE an existing user
router.delete(
    '/:userId',
    authenticateUser,
    userController.authorizeUser,
    userController.deleteUser
);

export default router;
