import express from 'express';
import dataCreationValidator from '../middlewares/validators/authValidator';
import Auth from '../controllers/auth';

const { signupValidator } = dataCreationValidator;
const { signup } = Auth;
const route = express.Router();

route.post('/auth/signup', signupValidator, signup);

export default route;
