import express from 'express';
import { auth, user } from './user';
import loan from './loan';

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send('welcome to Gilberts API..for docs, go to <a href ="https://quickcreditgilli.herokuapp.com/api-docs/">documentation</a> ');
});
router.use('/auth', auth);
router.use('/users', user);
router.use('/loans', loan);
export default router;
