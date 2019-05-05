import express from 'express';
import { auth, user } from './user';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', user);

export default router;