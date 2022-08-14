import { Router } from 'express';
import userController = require('./UserController');
import { authenticateUser } from '../authentication/Authentication';
import {
    validateUpdatedProperties,
    validateUserProperties,
} from './UserValidation';
import { upload } from '../media/Multer';

import experienceRouter from './experience/ExperienceRouter';
import educationRouter from './education/EducationRouter';
import linkRouter from './link/LinkRouter';
import skillsRouter from './skills/SkillsRouter';
import { param } from 'express-validator';

const router = Router();

// Initialize the user info routers
router.use('/education', educationRouter);
router.use('/experience', experienceRouter);
router.use('/links', linkRouter);
router.use('/skills', skillsRouter);

// GET Data about the current user
router.get('/me', authenticateUser, userController.getCurrentUserData);

// GET data about the user with the specified userId
router.get(
    '/:userId',
    param('userId')
        .exists()
        .withMessage('userId is a required parameter')
        .isUUID()
        .withMessage('userId is invalid'),
    userController.getUserData
);

// CREATE a new user
router.post(
    '/signup',
    validateUserProperties,
    userController.register,
    userController.login
);

// LOGIN an existing user
router.post('/login', userController.login);

// UPDATE an the current user
router.patch(
    '/',
    authenticateUser,
    validateUpdatedProperties,
    userController.updateUserInfo
);

// UPDATE the user avatar
router.put(
    '/avatar',
    upload.single('avatar'),
    authenticateUser,
    userController.updateAvatar
);

// DELETE the current avatar (i.e. reset the avatar)
router.delete('/avatar', authenticateUser, userController.resetAvatar);

// DELETE an the current user
router.delete('/', authenticateUser, userController.deleteUser);

export default router;
