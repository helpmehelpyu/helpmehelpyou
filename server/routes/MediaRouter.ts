import { Router } from 'express';
import { body } from 'express-validator';
import mediaController = require('../controllers/MediaController');
import { authenticateUser } from '../middleware/Authentication';
import { upload } from '../middleware/Multer';

const router = Router();

// GET media by id
router.get('/:mediaId', mediaController.findMediaById);

router.post(
    '/',
    authenticateUser,
    upload.single('media'),
    body('title').isLength({ min: 1, max: 500 }).escape(),
    body('description').isLength({ max: 5000 }).escape(),
    mediaController.uploadMedia
);

router.patch('/:mediaId', authenticateUser);

router.delete('/:mediaId', authenticateUser);

export default router;
