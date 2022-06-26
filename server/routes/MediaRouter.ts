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

router.patch(
    '/:mediaId',
    authenticateUser,
    validateMediaProperties,
    mediaController.updateMedia
);

router.delete('/:mediaId', authenticateUser);

export default router;
