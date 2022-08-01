import { Router } from 'express';
import userController = require('../controllers/UserController');
import { authenticateUser } from '../middleware/Authentication';
import {
    validateUpdatedProperties,
    validateUserProperties,
} from '../middleware/UserValidation';
import { upload } from '../middleware/Multer';

const router = Router();

// GET Data about the current user
router.get('/me', authenticateUser, userController.getCurrentUserData);

// GET data about the user with the specified userId
router.get('/:userId', userController.getUserData);

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
