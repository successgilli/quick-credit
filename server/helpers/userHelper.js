import 'babel-polyfill';
import bcrypt from 'bcrypt';
import db from '../model/db';

const saltRounds = 10;

class UserHelper {
  static successRes(token, user) {
    return {
      token,
      id: user.id,
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      email: user.user.trim(),
      address: user.address.trim(),
      isAdmin: user.isAdmin,
      status: user.status,
      password: user.password,
    };
  }

  static checkEmail(email) {
    // checking database for email.
    let present = false;
    db.forEach((x) => {
      if (x.type === 'user') {
        if (x.user === email) {
          present = true;
        }
      }
    });
    return present;
  }

  static findUser(email) {
    let sortUser;
    let userIndex;
    db.forEach((user, index) => {
      if (user.type === 'user') {
        if (user.user === email.trim()) {
          sortUser = user;
          userIndex = index;
        }
      }
    });
    return [sortUser, userIndex];
  }

  static async createUser(req) {
    const {
      firstName,
      lastName,
      address,
      email,
      password,
      companyName,
      companyAddress,
      monthlyIncome,
      bankName,
      bvn,
      accountNumber,
    } = req.body;
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
    return user;
  }
}

export default UserHelper;
