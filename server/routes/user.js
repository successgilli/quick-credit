import express from 'express';
import { DataCreationValidator, UserDataCheck } from '../middlewares/validator';
import User from '../controllers/userController';

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
user.patch('/:userEmail/verify', checkEmailFormat, checkVerifyUser, verify);
user.patch('/uploads/:userEmail', checkEmailFormat, checkUploadPix, uploadProfilePic);
export { auth, user };
