import express from 'express';
import { auth, user } from './user';
import loan from './loan';

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'welcome to Gilberts API..for docs, add "quickcreditgilli.herokuapp.com/api-docs" to navigate other routes',
  });
});
router.use('/auth', auth);
router.use('/users', user);
router.use('/loans', loan);
export default router;
