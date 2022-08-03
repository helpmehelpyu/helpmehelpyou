import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import educationController = require('../controllers/EducationController');
import { validateEducation } from '../middleware/EducationValidation';

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
    educationController.updateEducation
);

export default router;
