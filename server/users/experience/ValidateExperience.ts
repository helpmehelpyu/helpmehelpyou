import { body } from 'express-validator';
import validator from 'validator';

export const validateExperience = [
    body('jobTitle')
        .exists()
        .withMessage('jobTitle is a required field')
        .isString()
        .withMessage('Job Title must be a string')
        .isLength({ min: 1 })
        .withMessage('Job Title must be at least one character long')
        .trim()
        .escape(),
    body('organization')
        .optional()
        .trim()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage('Organization name must be alphanumeric')
        .escape(),
    body('startDate')
        .exists()
        .withMessage('start date is a required field')
        .isISO8601()
        .withMessage('start date must be a valid date'),
    body('endDate')
        .exists()
        .withMessage('end date is a required field')
        .custom((endDate, { req }) => {
            if (endDate !== null && !validator.isISO8601(endDate)) {
                throw Error('end date must be a valid date or null');
            }

            if (
                endDate &&
                Date.parse(endDate) < Date.parse(req.body.startDate)
            ) {
                throw Error('end date must be after start date');
            }

            return true;
        }),
    body('description')
        .optional()
        .isString()
        .withMessage('description must be a string')
        .trim()
        .escape(),
];
