import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

const checkToken = (req, res, Next) => {
  if (typeof req.headers.authorization === 'undefined') {
    const err = new Error('Unauthorised');
    err.statusCode = 403;
    Next(err);
  } else {
    try {     
      const decoded = jwt.verify(req.headers.authorization, process.env.jwt_secrete);
      req.isAdmin = decoded.isadmin;
      Next();
    } catch (e) {
      const err = new Error(e.message);
      err.statusCode = 403;
      Next(err);
    }
  }
};

export default checkToken;
