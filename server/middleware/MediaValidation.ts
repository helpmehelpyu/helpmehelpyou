import { body } from 'express-validator';

export const validateMediaProperties = [
    body('title')
        .exists()
        .withMessage('title is a required field')
        .isLength({ min: 1, max: 500 })
        .withMessage('title must be between 1 to 500 characters')
        .escape(),
    body('description')
        .isLength({ max: 5000 })
        .withMessage('description cannot exceed 5000 characters')
        .optional()
        .escape(),
];
