import express from 'express';
import { auth, user } from './user';
import loan from './loan';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/loans', loan);
export default router;