import { body } from 'express-validator';

export const validateNameAndUrl = [
    body('name')
        .exists()
        .withMessage('Name is a required field')
        .isAlphanumeric()
        .withMessage('Name has to be alphanumeric')
        .isLength({ max: 500 })
        .withMessage('Maximum length 500 characters')
        .escape(),
    body('url')
        .exists()
        .withMessage('Url is a required field')
        .isURL({ protocols: ['https'], require_protocol: true })
        .withMessage('Invalid Url. Make sure that the link is in https'),
];
