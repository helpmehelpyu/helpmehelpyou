import { body } from 'express-validator';

export const validateSkillName = [
    body('name')
        .exists()
        .withMessage('name is a required field')
        .not()
        .isIn([''])
        .withMessage('name is a required field')
        .isString()
        .withMessage('name must be a string')
        .toLowerCase()
        .trim()
        .escape(),
];
