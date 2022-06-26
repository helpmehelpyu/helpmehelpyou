import { body } from 'express-validator';

export const validateMediaProperties = [
    body('title').isLength({ min: 1, max: 500 }).escape(),
    body('description').isLength({ max: 5000 }).optional().escape(),
];
