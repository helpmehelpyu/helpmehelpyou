import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import educationController = require('../controllers/EducationController');
import { validateEducation } from '../middleware/EducationValidation';
import { body } from 'express-validator';

const router = Router();

// POST a new education
router.post(
    '/',
    authenticateUser,
    validateEducation,
    educationController.addEducation
);

// DELETE an existing education
router.delete('/', authenticateUser, educationController.deleteById);

// EDIT an existing education
router.put(
    '/',
    authenticateUser,
    validateEducation,
    body('id')
        .exists()
        .withMessage('id is a required field')
        .isNumeric()
        .withMessage('id must be a numeric value'),
    educationController.updateEducation
);

export default router;
