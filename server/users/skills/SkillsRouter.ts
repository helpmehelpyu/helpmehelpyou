import { Router } from 'express';
import { authenticateUser } from '../../authentication/Authentication';
import skillsController = require('./SkillsController');
import { validateSkillName } from './ValidateSkills';

const router = Router();

router.post(
    '/',
    authenticateUser,
    validateSkillName,
    skillsController.addSkill
);

router.delete(
    '/',
    authenticateUser,
    validateSkillName,
    skillsController.removeSkill
);

export default router;
