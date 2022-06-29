import { Router } from 'express';
import { body } from 'express-validator';
import userController = require('../controllers/UserController');
import { authenticateUser } from '../middleware/Authentication';

const router = Router();

// CREATE a new user
router.post(
    '/signup',
    body('firstName')
        .exists()
        .withMessage('first name is a required field')
        .bail()
        .trim()
        .isLength({ min: 1 })
        .withMessage('first name must be at least one character long')
        .isAlpha()
        .withMessage('first name can only include alphabet characters')
        .escape(),
    body('lastName')
        .exists()
        .withMessage('last name is a required field')
        .bail()
        .trim()
        .isLength({ min: 1 })
        .withMessage('last name needs to be at least one character')
        .isAlpha()
        .withMessage('last name can only include alphabet characters')
        .escape(),
    body('email')
        .exists()
        .withMessage('email is a required field')
        .bail()
        .isEmail()
        .withMessage('Invalid Email')
        .normalizeEmail()
        .escape(),
    body('password')
        .exists()
        .withMessage('password is a required field')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password needs to be at least 6 characters')
        .isStrongPassword()
        .withMessage('Password is not strong enough')
        .escape(),
    body('phoneNumber')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid Phone Number')
        .escape(),
    userController.register
);

// LOGIN an existing user
router.post('/login', userController.login);

// UPDATE an existing user
router.patch(
    '/:userId',
    authenticateUser,
    userController.authorizeUser,
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('first name must be at least one character long')
        .isAlpha()
        .withMessage('first name can only include alphabet characters')
        .escape(),
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('last name needs to be at least one character')
        .isAlpha()
        .withMessage('last name can only include alphabet characters')
        .escape(),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid Email')
        .normalizeEmail()
        .escape(),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password needs to be at least 6 characters')
        .isStrongPassword()
        .withMessage('Password is not strong enough')
        .escape(),
    body('phoneNumber')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid Phone Number')
        .escape(),
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
