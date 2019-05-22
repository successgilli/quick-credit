import 'babel-polyfill';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../model/query';
import UserHelper from '../helpers/userHelper';

const { successRes, findUser, createUser } = UserHelper;
dotEnv.config();

class User {
  static async signup(req, res) {
    const user = await createUser(req);
    const token = jwt.sign(user, process.env.jwt_secrete);
    res.status(200).json({
      status: 200,
      data: successRes(token, user),
    });
  }

  static async signin(req, res) {
    const { email } = req.body;
    const loginUser = await findUser(email);
    const token = jwt.sign(loginUser, process.env.jwt_secrete);
    res.status(200).json({
      status: 200,
      data: successRes(token, loginUser),
    });
  }

  static async verify(req, res) {
    const { userEmail } = req.params;
    const text = 'UPDATE users SET status=$1 WHERE email=$2 RETURNING *;';
    const param = ['verified', userEmail.trim()];
    const { rows } = await db(text, param);
    res.status(200).json({
      status: 200,
      data: {
        email: rows[0].email,
        firstName: rows[0].firstname,
        lastName: rows[0].lastname,
        password: rows[0].password,
        address: rows[0].address,
        status: rows[0].status,
      },
    });
  }

  static async uploadProfilePic(req, res) {
    const email = req.params.userEmail;
    const secureUrl = req.file.secure_url;
    const text = 'UPDATE users SET passporturl=$1 WHERE email=$2 RETURNING *;'
    const { rows } = await db(text, [secureUrl, email.trim()]);
    res.status(201).json({
      status: 201,
      data: rows[0],
    });
  }
}

export default User;
