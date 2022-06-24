import { Router } from 'express';

const router = Router();

router.post('/signup');

router.post('/login');

router.post('/logout');

router.put('/:userId');

router.delete('/:userId');

export default router;
