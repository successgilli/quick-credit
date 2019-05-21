import express from 'express';
import checkToken from '../middlewares/checkToken';
import checkClient from '../middlewares/checkClient';
import { DataCreationValidator, UserDataCheck } from '../middlewares/validator';
import User from '../controllers/userController';

const { isAdmin, isUser } = checkClient;
const { signupValidator, signinValidator } = DataCreationValidator;
const { signup, signin, verify, uploadProfilePic } = User;
const {
  checkSignupEmail,
  checkEmailFormat,
  checkSigninData,
  checkVerifyUser,
  checkUploadPix,
} = UserDataCheck;
const auth = express.Router();
const user = express.Router();

auth.post('/signup', signupValidator, checkSignupEmail, signup);
auth.post('/signin', signinValidator, checkSigninData, signin);
user.patch('/:userEmail/verify', checkEmailFormat, checkVerifyUser, checkToken, isAdmin, verify);
user.patch('/uploads/:userEmail', checkEmailFormat, checkUploadPix, checkToken, isUser, uploadProfilePic);
export { auth, user };
