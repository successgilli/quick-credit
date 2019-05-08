import express from 'express';
import { DataCreationValidator } from '../middlewares/validator';
import User from '../controllers/userController';

const { signupValidator, signinValidator } = DataCreationValidator;
const { signup, signin, verify } = User;
const auth = express.Router();
const user = express.Router();

auth.post('/signup', signupValidator, signup);
auth.post('/signin', signinValidator, signin);
user.patch('/:userEmail([0-9A-Za-z-@.]+)/verify', verify);
export { auth, user };
