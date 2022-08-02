import { body } from 'express-validator';
import { DegreeType } from '../models/Education';

export const validateEducation = [
    body('school')
        .exists()
        .withMessage('school name is a required field')
        .isAlpha()
        .withMessage('School name can only contain alphabet letters')
        .trim()
        .escape(),
    body('fieldOfStudy')
        .exists()
        .withMessage('field of study is a required field')
        .isAlpha()
        .withMessage('field of study can only contain alphabet letters')
        .trim()
        .escape(),
    body('degree')
        .exists()
        .withMessage('degree is a required field')
        .isIn(Object.values(DegreeType))
        .withMessage('Invalid Degree Type')
        .trim()
        .escape(),
    body('gpa')
        .optional()
        .isFloat({ min: 0, max: 4.0 })
        .withMessage('GPA must be a numeric value')
        .trim()
        .escape(),
    body('startYear')
        .exists()
        .withMessage('start year is a required field')
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('Invalid Start year')
        .trim()
        .escape(),
    body('endYear')
        .exists()
        .withMessage('end year is a required field')
        .isInt()
        .withMessage('end year must be a number')
        .custom((endYear, { req }) => {
            if (endYear < req.body.startYear) {
                throw Error('end year must be after start year');
            }
            return true;
        })
        .trim()
        .escape(),
];
