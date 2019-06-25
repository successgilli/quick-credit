import 'babel-polyfill';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../model/query';
import UserHelper from '../helpers/userHelper';

const { successRes, findUser, getUser, createUser } = UserHelper;
dotEnv.config();

class User {
  static async signup(req, res, next) {
    try {
      const user = await createUser(req);
      const token = jwt.sign(user, process.env.jwt_secrete);
      res.status(201).json({
        status: 201,
        data: successRes(token, user),
      });
    } catch (e) {
      next(e);
    }
  }

  static async signin(req, res, next) {
    const { email } = req.body;
    try {
      const loginUser = await findUser(email);
      const token = jwt.sign(loginUser, process.env.jwt_secrete);
      res.status(200).json({
        status: 200,
        data: successRes(token, loginUser),
      });
    } catch (e) {
      next(e);
    }
  }

  static async verify(req, res, next) {
    const { userEmail } = req.params;
    try {
      const text = 'UPDATE users SET status=$1 WHERE email=$2 RETURNING *;';
      const param = ['verified', userEmail.trim()];
      const { rows } = await db(text, param);
      res.status(200).json({
        status: 200,
        data: {
          email: rows[0].email,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          address: rows[0].address,
          status: rows[0].status,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async uploadProfilePic(req, res, next) {
    const { email } = await getUser(req.user);
    const secureUrl = req.file.secure_url;
    try {
      const text = 'UPDATE users SET passporturl=$1 WHERE email=$2 RETURNING *;';
      const { rows } = await db(text, [secureUrl, email.trim()]);
      const data = rows[0];
      delete data.password;
      res.status(201).json({
        status: 201,
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = req.email;
      const text = 'SELECT * FROM users WHERE email=$1';
      const param = [user];
      const result = await db(text, param);
      res.status(200).json({
        status: 200,
        data: result.rows[0],
      });
    } catch (err) {
      next(err);
    }
  }
}

export default User;
