import { body } from 'express-validator';

export const validateUpdatedProperties = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name must be at least one character long')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('First name can only include alphabet characters')
        .escape(),
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Last name needs to be at least one character')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Last name can only include alphabet characters')
        .escape(),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid Email')
        .normalizeEmail()
        .escape(),
    body('phoneNumber')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid Phone Number')
        .escape(),
];

export const validateUserProperties = [
    body('firstName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name must be at least one character long')
        .bail()
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('First name can only include alphabet characters')
        .bail()
        .escape(),
    body('lastName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Last name needs to be at least one character')
        .bail()
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Last name can only include alphabet characters')
        .bail()
        .escape(),
    body('email')
        .isEmail()
        .withMessage('Invalid Email')
        .bail()
        .normalizeEmail()
        .escape(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password needs to be at least 6 characters')
        .bail(),
    body('phoneNumber')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid Phone Number')
        .bail()
        .escape(),
];
