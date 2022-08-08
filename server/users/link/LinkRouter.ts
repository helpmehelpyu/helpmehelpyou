import { Router } from 'express';
import { authenticateUser } from '../../authentication/Authentication';
import { validateNameAndUrl } from './LinkValidation';
import linkController = require('./LinkController');

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
