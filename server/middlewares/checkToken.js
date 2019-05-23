import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

const checkToken = (req, res, next) => {
  if (typeof req.headers.authorization === 'undefined') {
    const err = new Error('Unauthorised');
    err.statusCode = 401;
    next(err);
  } else {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.jwt_secrete);
      req.isAdmin = decoded.isadmin;
      req.user = decoded.id;
      req.email = decoded.email;
      console.log(req.email, 'email')
      console.log(req.user, 'token')
      next();
    } catch (e) {
      const err = new Error(e.message);
      err.statusCode = 401;
      next(err);
    }
  }
};

export default checkToken;
