import { Router } from 'express';
import { body } from 'express-validator';
import userController = require('../controllers/UserController');

const router = Router();

router.post(
    '/signup',
    body('firstName').trim().isLength({ min: 1 }).isAlpha().escape(),
    body('lastName').trim().isLength({ min: 1 }).isAlpha().escape(),
    body('email').isEmail().normalizeEmail().escape(),
    body('password').isLength({ min: 6 }).isStrongPassword().escape(),
    body('phoneNumber').optional().isMobilePhone('any').escape(),
    userController.register
);

router.post('/login', userController.register);

router.post('/logout');

router.put('/:userId');

router.delete('/:userId');

export default router;
