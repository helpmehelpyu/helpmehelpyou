import { Router } from 'express';
import mediaController = require('../media/MediaController');
import { authenticateUser } from '../authentication/Authentication';
import { validateMediaProperties } from '../media/MediaValidation';
import { upload } from '../media/Multer';

const router = Router();

// GET media by id
router.get('/:mediaId', mediaController.findMediaById);

router.get('', mediaController.getMedia);

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
