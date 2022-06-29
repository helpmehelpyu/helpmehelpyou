import { Router } from 'express';
import { authenticateUser } from '../middleware/Authentication';
import linkController = require('../controllers/LinkController');
import { validateNameAndUrl } from '../middleware/LinkValidation';

const router = Router();

// CREATE a new Link for the current user
router.post(
    '/',
    authenticateUser,
    validateNameAndUrl,
    linkController.createNewLink
);

// UPDATE an existing Link
router.put(
    '/:linkId',
    authenticateUser,
    validateNameAndUrl,
    linkController.authorizeUser,
    linkController.updateExistingLink
);

router.delete(
    '/:linkId',
    authenticateUser,
    linkController.authorizeUser,
    linkController.deleteLink
);
export default router;
