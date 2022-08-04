import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import experienceController = require('../controllers/ExperienceController');
import { validateExperience } from '../middleware/ValidateExperience';
import { body } from 'express-validator';

const router = Router();

// ADD a new experience
router.post(
    '/',
    authenticateUser,
    validateExperience,
    experienceController.addNewExperience
);

router.delete(
    '/',
    authenticateUser,
    experienceController.deleteExistingExperience
);

router.put(
    '/',
    authenticateUser,
    validateExperience,
    body('id')
        .exists()
        .withMessage('id is a required field')
        .isNumeric()
        .withMessage('id must be a numeric value'),
    experienceController.editExistingExperience
);

export default router;
