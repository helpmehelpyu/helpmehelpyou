import { Router } from 'express';
import experienceController = require('./ExperienceController');
import { body } from 'express-validator';
import { authenticateUser } from '../../authentication/Authentication';
import { validateExperience } from './ValidateExperience';

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
