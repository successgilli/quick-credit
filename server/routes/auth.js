import express from 'express';
import dataCreationValidator from '../middlewares/validators/authValidator';
import Auth from '../controllers/auth';

const { signupValidator, signinValidator } = dataCreationValidator;
const { signup, signin } = Auth;
const route = express.Router();

route.post('/auth/signup', signupValidator, signup);
route.post('/auth/signin', signinValidator, signin);
export default route;
