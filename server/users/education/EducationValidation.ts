import { body } from 'express-validator';
import { DegreeType } from './Education.entity';

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
        .withMessage('Invalid Degree Type'),
    body('gpa')
        .optional()
        .custom((gpa) => {
            if (gpa !== null && typeof gpa !== 'number') {
                throw Error('GPA must be a number or null');
            }
            if (gpa && (gpa > 4.0 || gpa < 0)) {
                throw Error('GPA must be between 0.0 and 4.0');
            }
            return true;
        }),
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
