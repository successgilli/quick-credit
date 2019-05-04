import 'babel-polyfill';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../model/db';
import AuthHelper from '../helpers/authHelper';

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
      const user = {
        id: Math.floor(Math.random() * 100000),
        user: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: address.trim(),
        password: password.trim(),
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
}

export default Auth;

