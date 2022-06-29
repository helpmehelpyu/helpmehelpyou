import { body } from 'express-validator';

export const validateUpdatedProperties = [
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
];

export const validateUserProperties = [
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
];
