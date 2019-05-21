
class CheckClient {
  static isAdmin(req, res, next) {
    if (!req.isAdmin) {
      const err = new Error('route is only accessible by admin');
      err.statusCode = 401;
      next(err);
    } else {
      next();
    }
  }

  static isUser(req, res, next) {
    if (req.isAdmin) {
      const err = new Error('route is only accessible by user');
      err.statusCode = 401;
      next(err);
    } else {
      next();
    }
  }
}

export default CheckClient;
