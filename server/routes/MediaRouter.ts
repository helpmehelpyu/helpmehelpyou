import { Router } from 'express';
import mediaController = require('../controllers/MediaController');

const router = Router();

// GET media by id
router.get('/:mediaId', mediaController.fetchMediaById);

router.post('/');

router.patch('/:mediaId');

router.delete('/:mediaId');

export default router;
