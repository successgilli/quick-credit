import db from '../model/db';

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
      if (x.user === email) {
        present = true;
      }
    });
    return present;
  }
}

export default UserHelper;
