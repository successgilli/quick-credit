/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import sendValidationInfo from '../helpers/validatorHelper';
import UserHelper from '../helpers/userHelper';
import uploads from '../helpers/imageUpload';
import db from '../model/db';

const { checkEmail } = UserHelper;

class ImproperValuesChecker {
  static improperSignupValues(req) {
    const {
      firstName, lastName, address, email, password, companyName, companyAddress, monthlyIncome,
      bankName, bvn, accountNumber,
    } = req.body;
    const impropervalues = [];
    if (!/^[0-9]{4,}$/.test(monthlyIncome.trim())) {
      impropervalues.push('monthly income must be a number and atleast 4 chracters long');
    }
    if ((password.trim().length <= 7)) {
      impropervalues.push('password must be atleast 7 characters long. ');
    }
    if (!/^[a-zA-Z-]{4,}$/.test(firstName.trim())) {
      impropervalues.push('name can only contain letters and hyphen (-) of atleast 4 letters. ');
    }
    if (!/^[a-zA-Z-]{4,}$/.test(lastName.trim())) {
      impropervalues.push('lastName can only contain letters and hyphen (-) of atleast 4 letters. ');
    }
    if (!/^[a-zA-Z-]{4,}$/.test(bankName.trim())) {
      impropervalues.push('bankName can only contain letters and hyphen (-) of atleast 4 letters. ');
    }
    if (!/^[a-zA-Z-]{4,}$/.test(companyName.trim())) {
      impropervalues.push('company name can only contain letters and hyphen (-) of atleast 4 letters. ');
    }
    if (!/^[0-9]{10}$/.test(accountNumber.trim())) {
      impropervalues.push('account number can only contain 10 digit numbers. ');
    }
    if (!/^[0-9]{11}$/.test(bvn.trim())) {
      impropervalues.push('bvn number can only contain 11 digit numbers. ');
    }
    if (/^[0-9]+$/.test(address.trim())) {
      impropervalues.push('address cannot contain all numbers');
    }
    if (/^[0-9]+$/.test(companyAddress.trim())) {
      impropervalues.push('company address cannot contain all numbers');
    }
    if (!/(?!^[\d]+$)^[a-zA-Z0-9 ]{7,}$/.test(address.trim())) {
      impropervalues.push('address can only contain letters, numbers and space (-) not less than 7. ');
    }
    if (!/^([a-z])([a-z0-9]+)@([a-z]{3,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(email.trim())) {
      impropervalues.push('email must contain an "@" symbol and proper extensions after "."');
    }
    return impropervalues;
  }

  static improperSigninValues(req) {
    const impropervalues = [];
    const { email, password } = req.body;
    if (email.trim().length === 0) {
      impropervalues.push(' email field cannot be empty. ');
    }
    if (password.trim().length === 0) {
      impropervalues.push(' password field cannot be empty. ');
    }
    return impropervalues;
  }

  static improperLaonAppValues(req) {
    const impropervalues = [];
    const { email, tenor, amount } = req.body;
    if (email.trim().length === 0) {
      impropervalues.push(' email field cannot be empty. ');
    }
    if (!/^([a-z])([a-z0-9]+)@([a-z]{3,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(email.trim())) {
      impropervalues.push(' email must contain an "@" symbol and proper extensions after "." ');
    }
    if (!/(?!^[0]+$)^[0-9]{1,2}$/.test(tenor.trim())) {
      impropervalues.push(' tenor must be an integer between 1 and 12. e.g 12,5.');
    }
    if (((Number(tenor.trim())) > 12) || ((Number(tenor.trim())) < 1)) {
      impropervalues.push(' tenor must be between 1 and 12');
    }
    if (!/^[0-9]{5,6}$/.test(amount.trim())) {
      impropervalues.push(' the least amount you can borrow is 10,000 and cannot contain "," and "."');
    }
    if (((Number(amount.trim())) % 10000) !== 0 || (Number(amount.trim())) > 100000) {
      impropervalues.push(' we only loan multiples of ten (10,000). and max. of 100,000');
    }
    return impropervalues;
  }

  static improperLaonStatusValues(req) {
    const { status } = req.body;
    const impropervalues = [];
    if (!(/^approve$/i.test(status.trim()) || /^reject$/i.test(status.trim()))) {
      impropervalues.push('status field can only be either \'approve\' or \'reject\'.');
    }
    return impropervalues;
  }

  static improperRepaymentValues(req) {
    const impropervalues = [];
    const { amount } = req.body;
    if (!/^[\d]+(\.[0-9]+)?$/.test(amount)) {
      impropervalues.push('amount can only be either integer or float');
    }
    return impropervalues;
  }
}

class DataCreationValidator {
  static signupValidator(req, res, Next) {
    const keys = ['firstName', 'lastName', 'address', 'email', 'password',
      'companyName', 'companyAddress', 'monthlyIncome',
      'bankName', 'bvn', 'accountNumber'];
    sendValidationInfo(
      res, req, keys, ImproperValuesChecker.improperSignupValues,
      Next,
    );
  }

  static signinValidator(req, res, Next) {
    const keys = ['email', 'password'];
    sendValidationInfo(
      res, req, keys, ImproperValuesChecker.improperSigninValues,
      Next,
    );
  }

  static loanApplyValidator(req, res, Next) {
    const keys = ['email', 'amount', 'tenor'];
    sendValidationInfo(
      res, req, keys, ImproperValuesChecker.improperLaonAppValues,
      Next,
    );
  }

  static laonStatusValidator(req, res, Next) {
    const keys = ['status'];
    sendValidationInfo(
      res, req, keys, ImproperValuesChecker.improperLaonStatusValues,
      Next,
    );
  }

  static loanRepaymentValidator(req, res, Next) {
    const keys = ['amount'];
    sendValidationInfo(
      res, req, keys, ImproperValuesChecker.improperRepaymentValues,
      Next,
    );
  }
}

class DataQuery {
  static checkQueryStrings(req, res, Next) {
    const { status, repaid } = req.query;
    if ((typeof status === 'undefined') && (typeof repaid === 'undefined')) {
      Next();
    } else if (((typeof status === 'undefined') && (typeof repaid !== 'undefined'))
    || ((typeof status !== 'undefined') && (typeof repaid === 'undefined'))) {
      res.status(400).json({
        status: 400,
        error: 'both status and repaid query keys are required',
      });
    } else {
      const improperVals = [];
      if (!((/^approved$/i.test(status) || /^rejected$/i.test(status)))) {
        improperVals.push('status value must be a string of either approved or rejected');
      }
      if (!((/^true$/i.test(repaid)) || (/^false$/i.test(repaid)))) {
        improperVals.push('repaid value must be a string of either true or false');
      }
      if (improperVals.length === 0) {
        Next();
      } else {
        res.status(400).json({
          status: 400,
          error: improperVals.join(),
        });
      }
    }
  }
}

class loanDataCheck {
  static checkIdFormat(req, res, Next) {
    const { loanId } = req.params;
    if (!/^[0-9]{1,10}$/.test(loanId.trim())) {
      const err = new Error('invalid id format');
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }

  static applicationCheck(req, res, Next) {
    const { email } = req.body;
    // check db if user is present.
    let applicant = 'not found';
    db.forEach((user) => {
      if (user.type === 'user') {
        if (user.user === email.trim()) {
          applicant = user;
        }
      }
    });
    // check if user has an outstanding loan.
    let grantLoan = true;
    db.forEach((loan) => {
      if (loan.type === 'loan') {
        if (loan.user === email.trim()) {
          if (!(loan.repaid)) {
            grantLoan = false;
          }
          if (loan.status === 'rejected') { // allow user to apply if existing loan was rejected;
            grantLoan = true;
          }
        }
      }
    });
    // if user not found in db.
    if (applicant === 'not found') {
      const err = new Error('user not in database');
      err.statusCode = 400;
      Next(err);
    } else if (!grantLoan) {
    // if no outstanding loan.
      const err = new Error(`user '${email}' already has an outstanding loan.`);
      err.statusCode = 400;
      Next(err);
    }
    else {
      Next();
    }
    // end
  }

  static checkGetLoan(req, res, Next) {
    const { loanId } = req.params;// query loanId in db.
    let specificLoan = 'not found';
    db.forEach((loan) => {
      if (loan.type === 'loan') {
        if (loan.id === Number(loanId)) {
          specificLoan = loan;
        }
      }
    });
    if (specificLoan === 'not found') { // if not found in db, say 'not found'.
      const err = new Error('loan not in database');
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }
  // test post man

  static checkStatus(req, res, Next) {
    const { status } = req.body;
    const { loanId } = req.params;
    // query loanId in db.
    let specificLoan = 'not found';
    let loanIndex;
    db.forEach((loan, index) => {
      if (loan.type === 'loan') {
        if (loan.id === Number(loanId)) {
          specificLoan = loan;
          loanIndex = index;
        }
      }
    });
    if (specificLoan === 'not found') { // if not found in db, say 'not found'.
      const err = new Error('loan not in database');
      err.statusCode = 400;
      Next(err);
    } else if (specificLoan.status !== 'pending') {
      const err = new Error(`loan is already ${db[loanIndex].status}`);
      err.statusCode = 400;
      Next(err);
    } else if (!/^reject$/i.test(status.trim())) {
      const applicant = specificLoan.user; // check the status of user if verified.
      let verified = false;
      db.forEach((user) => {
        if (user.type === 'user') {
          if (user.user === applicant) {
            if (user.status === 'verified') {
              verified = true;
            }
          }
        }
      });
      if (!verified) {
        const err = new Error('user is not yet verifed');
        err.statusCode = 400;
        Next(err);
      } else {
        Next();
      }
    } else {
      Next();
    }
  }

  static postRepaymentCheck(req, res, Next) {
    const { amount } = req.body;
    const { loanId } = req.params;
    // query loanId in db.
    let specificLoan = 'not found';
    let loanIndex;
    db.forEach((loan, index) => {
      if (loan.type === 'loan') {
        if (loan.id === Number(loanId)) {
          specificLoan = loan;
          loanIndex = index;
        }
      }
    });
    if (specificLoan === 'not found') { // if loan not found.
      const err = new Error('loan not found');
      err.statusCode = 400;
      Next(err);
    } else if (db[loanIndex].status !== 'approved') {
      const err = new Error(`you cant post repayment for the loan '${loanId}' not yet approved`);
      err.statusCode = 400;
      Next(err);
    } else if ((db[loanIndex].repaid)) {
      const err = new Error('loan already fully paid');
      err.statusCode = 400;
      Next(err);
    } else if (!(Number(amount) <= db[loanIndex].balance)) {
      const err = new Error('repayed amount cannot be greater than loan balance');
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }

  static checkGetRepayment(req, res, Next) {
    const { loanId } = req.params;
    // query loanId in db.
    let specificLoan = 'not found';
    db.forEach((loan, index) => {
      if (loan.type === 'loan') {
        if (loan.id === Number(loanId)) {
          specificLoan = loan;
        }
      }
    });
    if (specificLoan === 'not found') {
      const err = new Error(`loan with id: ${loanId} not found`);
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }
}

class UserDataCheck {
  static checkSignupEmail(req, res, Next) {
    const { email } = req.body;
    if (checkEmail(email.trim())) {
      const err = new Error('email already exists');
      err.statusCode = 403;
      Next(err);
    } else {
      Next();
    }
  }

  static checkEmailFormat(req, res, Next) {
    const { userEmail } = req.params;
    if (!/^([a-z])([a-z0-9]+)@([a-z]{3,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(userEmail.trim())) {
      const err = new Error('invalid email format');
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }

  static checkSigninData(req, res, Next) {
    const { email, password } = req.body;
    let loginUser = 'not found';
    db.forEach((user) => {
      if (user.type === 'user') {
        if (user.user === email.trim()) {
          loginUser = user;// save the user.
        }
      }
    });
    if (loginUser === 'not found') {
      const err = new Error('user not in database');
      err.statusCode = 403;
      Next(err);
    } else if (!(bcrypt.compareSync(password, loginUser.password))) {
      const err = new Error('invalid email or password');
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }

  static checkVerifyUser(req, res, Next) {
    const { userEmail } = req.params;
    // query db if user is present.
    let userToVerify = 'not found';
    db.forEach((user) => {
      if (user.type === 'user') {
        if (user.user === userEmail.trim()) {
          userToVerify = user;
        }
      }
    });
    // if user not found in db.
    if (userToVerify === 'not found') {
      const err = new Error('user not in database');
      err.statusCode = 400;
      Next(err);
    } else if (userToVerify.status === 'verified') {
      const err = new Error(`user '${userEmail}' already verified`);
      err.statusCode = 400;
      Next(err);
    } else {
      Next();
    }
  }

  static checkUploadPix(req, res, Next) {
    const email = req.params.userEmail;
    // query db if user is present.
    let userToUpload = 'not found';
    db.forEach((user) => {
      if (user.type === 'user') {
        if (user.user === email.trim()) {
          userToUpload = user;
        }
      }
    });
    if (userToUpload === 'not found') {
      const err = new Error('user not found');
      err.statusCode = 400;
      Next(err);
    } else {
      uploads.single('image')(req, res, (error) => {
        if (typeof req.file === 'undefined') {
          const err = new Error('ensure image key is available and has an image value');
          err.statusCode = 400;
          Next(err);
        } else {
          Next();
        }
      });
    }
  }
}
export {
  DataCreationValidator,
  DataQuery,
  loanDataCheck,
  UserDataCheck,
};
