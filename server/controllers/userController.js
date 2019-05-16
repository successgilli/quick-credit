/* eslint-disable no-lonely-if */
import 'babel-polyfill';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../model/db';
import UserHelper from '../helpers/userHelper';

const { successRes, findUser, createUser } = UserHelper;
dotEnv.config();

class User {
  static async signup(req, res) {
    const user = await createUser(req);
    db.push(user);// db insert user in database,
    const token = jwt.sign(user, process.env.jwt_secrete);
    res.status(200).json({
      status: 200,
      data: successRes(token, user),
    });
  }

  static signin(req, res) {
    const { email } = req.body;
    const loginUser = findUser(email)[0];
    const token = jwt.sign(loginUser, process.env.jwt_secrete);
    res.status(200).json({
      status: 200,
      data: successRes(token, loginUser),
    });
  }

  static verify(req, res) {
    const { userEmail } = req.params;
    // query db if user is present.
    const userToVerify = findUser(userEmail)[0];
    userToVerify.status = 'verified';
    res.status(200).json({
      status: 200,
      data: {
        email: userToVerify.user,
        firstName: userToVerify.firstName,
        lastName: userToVerify.lastName,
        password: userToVerify.password,
        address: userToVerify.address,
        status: userToVerify.status,
      },
    });
  }

  static uploadProfilePic(req, res) {
    const email = req.params.userEmail;
    // query db if user is present.
    const userToVerify = findUser(email)[0];
    const indexUser = findUser(email)[1];
    const secureUrl = req.file.secure_url;
    db[indexUser].profilePic = secureUrl; // stor the picture to the user in db
    res.status(201).json({
      status: 201,
      data: userToVerify,
    });
  }
}

export default User;
