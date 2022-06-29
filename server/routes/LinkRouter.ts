import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import linkController = require('../controllers/LinkController');
import { body } from 'express-validator';

const router = Router();

// CREATE a new Link for the current user
router.post(
    '/',
    authenticateUser,
    body('name')
        .exists()
        .withMessage('Name is a required field')
        .isAlphanumeric()
        .withMessage('Name has to be alphanumeric')
        .isLength({ min: 1, max: 500 })
        .withMessage('Name must be between length 1 to 500 characters')
        .escape(),
    body('url')
        .exists()
        .withMessage('Url is a required field')
        .isURL({ protocols: ['https'], require_protocol: true })
        .withMessage('Invalid Url. Make sure that the link is in https'),
    linkController.createNewLink
);

// UPDATE an existing Link
router.put(
    '/:linkId',
    authenticateUser,
    body('name')
        .exists()
        .withMessage('Name is a required field')
        .isAlphanumeric()
        .withMessage('Name has to be alphanumeric')
        .isLength({ max: 500 })
        .withMessage('Maximum length 500 characters')
        .escape(),
    body('url')
        .exists()
        .withMessage('Url is a required field')
        .isURL({ protocols: ['https'], require_protocol: true })
        .withMessage('Invalid Url. Make sure that the link is in https'),
    linkController.authorizeUser,
    linkController.updateExistingLink
);

export default router;
