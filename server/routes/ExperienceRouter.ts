import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import experienceController = require('../controllers/ExperienceController');
import { validateExperience } from '../middleware/ValidateExperience';

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

export default router;
