import 'babel-polyfill';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../model/db';
import AuthHelper from '../helpers/authHelper';

const saltRounds = 10;
const { successRes, checkEmail } = AuthHelper;
dotEnv.config();

class Auth {
  static async signup(req, res) {
    const {
      firstName, lastName, address, email, password, companyName, companyAddress, monthlyIncome,
      bankName, bvn, accountNumber,
    } = req.body;
    const emailPresent = checkEmail(email.trim());
    if (emailPresent) {
      res.status(403).json({ status: 403, error: 'email already exists' });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password.trim(), salt);
      const user = {
        id: Math.floor(Math.random() * 100000),
        user: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: address.trim(),
        password: hash,
        companyAddress: companyAddress.trim(),
        companyName: companyName.trim(),
        bvn: bvn.trim(),
        bankName: bankName.trim(),
        accountNumber: accountNumber.trim(),
        monthlyIncome: monthlyIncome.trim(),
        isAdmin: false,
        status: 'unverified',
        type: 'user',
      };
      db.push(user);// db insert user in database,
      const token = jwt.sign(user, process.env.jwt_secrete);
      res.status(200).json({
        status: 200,
        data: successRes(token, user),
      });
    }
  }

  static signin(req, res) {
    const { email, password } = req.body;
    // query email in database
    let loginUser = 'not found';
    db.forEach((user) => {
      if (user.user === email.trim()) {
        loginUser = user;// save the user.
      }
    });
    if (loginUser === 'not found') {
      res.status(403).json({
        status: 403,
        error: 'user not in database',
      });// if email is found, now query password.   
    } else if (bcrypt.compareSync(password, loginUser.password)) {
      const token = jwt.sign(loginUser, process.env.jwt_secrete);
      res.status(200).json({
        status: 200,
        data: successRes(token, loginUser),
      });
    } else {
      res.status(400).json({
        status: 400,
        error: 'invalid email or password',
      });
    }
  }
}

export default Auth;
