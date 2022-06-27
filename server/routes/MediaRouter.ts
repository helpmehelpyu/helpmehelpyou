import { Router } from 'express';
import mediaController = require('../controllers/MediaController');
import { authenticateUser } from '../middleware/Authentication';
import { validateMediaProperties } from '../middleware/MediaValidation';
import { upload } from '../middleware/Multer';

const router = Router();

// GET media by id
router.get('/:mediaId', mediaController.findMediaById);

// CREATE a new media object
router.post(
    '/',
    upload.single('media'),
    authenticateUser,
    validateMediaProperties,
    mediaController.uploadMedia
);

// UPDATE an existing media
router.patch(
    '/:mediaId',
    authenticateUser,
    mediaController.authorizeUser,
    validateMediaProperties,
    mediaController.updateMedia
);

// DELETE an existing media
router.delete(
    '/:mediaId',
    authenticateUser,
    mediaController.authorizeUser,
    mediaController.deleteMedia
);

export default router;
