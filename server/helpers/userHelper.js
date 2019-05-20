import 'babel-polyfill';
import bcrypt from 'bcrypt';
import db from '../model/query';

const saltRounds = 10;

class UserHelper {
  static successRes(token, user) {
    return {
      token,
      id: user.id,
      firstName: user.firstname.trim(),
      lastName: user.lastname.trim(),
      email: user.userr.trim(),
      address: user.address.trim(),
      isAdmin: user.isadmin,
      status: user.status,
      password: user.password,
    };
  }

  static async findUser(email) {
    const text = 'SELECT * FROM users WHERE userr=$1;';
    const { rows } = await db(text, [email.trim()]);
    if (rows.length === 0) {
      return 'not found';
    } 
    return rows[0];
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
    const param = [
      firstName.trim(),
      lastName.trim(),
      address.trim(),
      email.trim(),
      hash,
      companyAddress.trim(),
      companyName.trim(),
      bvn.trim(),
      bankName.trim(),
      accountNumber.trim(),
      monthlyIncome.trim(),
    ];
    const text = `INSERT INTO users (
      firstname,
      lastname,
      address,
      userr,
      password,
      companyaddress,
      companyname,
      bvn,
      bankname,
      accountnumber,
      monthlyincome
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`;
    const { rows } = await db(text, param);
    const user = rows[0];
    return user;
  }
}

export default UserHelper;
