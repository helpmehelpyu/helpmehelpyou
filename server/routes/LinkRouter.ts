import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import linkController = require('../controllers/LinkController');
import { body } from 'express-validator';

const router = Router();

// CREATE a new Link for the current user
router.post(
    '/',
    authenticateUser,
    body('name').isAlphanumeric().isLength({ max: 500 }).escape().exists(),
    body('url').isURL().escape().exists(),
    linkController.createNewLink
);

// UPDATE an existing Link
router.put(
    '/:linkId',
    authenticateUser,
    body('name').isAlphanumeric().isLength({ max: 500 }).escape().exists(),
    body('url').isURL().escape().exists(),
    linkController.authorizeUser,
    linkController.updateExistingLink
);

export default router;
