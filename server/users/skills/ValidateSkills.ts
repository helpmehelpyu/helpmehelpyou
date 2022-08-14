import { body } from 'express-validator';

export const validateSkillName = [
    body('name')
        .exists()
        .withMessage('name is a require field')
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage('name must be a alphanumeric value')
        .toLowerCase()
        .trim()
        .escape(),
];
