import { body } from 'express-validator';
import validator from 'validator';

export const validateExperience = [
    body('jobTitle')
        .exists()
        .withMessage('jobTitle is a required field')
        .isString()
        .withMessage('Job Title must be a string')
        .trim()
        .escape(),
    body('organization')
        .optional()
        .isAlphanumeric()
        .withMessage('Organization name must be alphanumeric')
        .trim()
        .escape(),
    body('startDate')
        .exists()
        .withMessage('start date is a required field')
        .isISO8601()
        .withMessage('start date must be a valid date'),
    body('endDate')
        .exists()
        .withMessage('end date is a required field')
        .isISO8601()
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
function isISO8601(endDate: any) {
    throw new Error('Function not implemented.');
}
