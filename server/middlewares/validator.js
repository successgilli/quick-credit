import 'babel-polyfill';
import bcrypt from 'bcrypt';
import sendValidationInfo from '../helpers/validatorHelper';
import uploads from '../helpers/imageUpload';
import userHelper from '../helpers/userHelper';
import LoanHelper from '../helpers/loanHelpers';
import db from '../model/query';

const { findUser } = userHelper;
const { getSpecificLoan } = LoanHelper;

class InvalidInputChecker {
  static invalidSignupValues(req) {
    const {
      firstName, lastName, address, email, password, companyName, companyAddress, monthlyIncome,
      bankName, bvn, accountNumber,
    } = req.body;
    const impropervalues = {};
    if (!/^[0-9]{4,}$/.test(monthlyIncome.trim())) {
      impropervalues.monthlyincome = 'monthly income must be a number and atleast 4 chracters long';
    }
    if ((password.trim().length <= 7)) {
      impropervalues.password = 'password must be atleast 7 characters long. ';
    }
    if (!/^[a-zA-Z-]{4,}$/.test(firstName.trim())) {
      impropervalues.firstName = 'name can only contain letters and hyphen (-) of atleast 4 letters. ';
    }
    if (!/^[a-zA-Z-]{4,}$/.test(lastName.trim())) {
      impropervalues.lastName = 'lastName can only contain letters and hyphen (-) of atleast 4 letters. ';
    }
    if (!/^[a-zA-Z-]{4,}$/.test(bankName.trim())) {
      impropervalues.bankName = 'bankName can only contain letters and hyphen (-) of atleast 4 letters. ';
    }
    if (!/^[a-zA-Z-]{4,}$/.test(companyName.trim())) {
      impropervalues.companyName = 'company name can only contain letters and hyphen (-) of atleast 4 letters. ';
    }
    if (!/^[0-9]{10}$/.test(accountNumber.trim())) {
      impropervalues.accountNumber = 'account number can only contain 10 digit numbers. ';
    }
    if (!/^[0-9]{11}$/.test(bvn.trim())) {
      impropervalues.bvn = 'bvn number can only contain 11 digit numbers. ';
    }
    if (/^[0-9]+$/.test(address.trim())) {
      impropervalues.address1 = 'address cannot contain all numbers';
    }
    if (/^[0-9]+$/.test(companyAddress.trim())) {
      impropervalues.companyAddress = 'company address cannot contain all numbers';
    }
    if (!/(?!^[\d]+$)^[a-zA-Z0-9 ]{7,}$/.test(address.trim())) {
      impropervalues.address2 = 'address can only contain letters, numbers and space (-) not less than 7. ';
    }
    if (!/^([a-z])([a-z0-9]+)@([a-z]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(email.trim())) {
      impropervalues.email = 'invalid email format';
    }
    return impropervalues;
  }

  static invalidSigninValue(req) {
    const impropervalues = {};
    const { email, password } = req.body;
    if (email.trim().length === 0) {
      impropervalues.email = ' email field cannot be empty. ';
    }
    if (password.trim().length === 0) {
      impropervalues.password = ' password field cannot be empty. ';
    }
    return impropervalues;
  }

  static invalidLoanAppValues(req) {
    const impropervalues = {};
    const { email, tenor, amount } = req.body;
    if (email.trim().length === 0) {
      impropervalues.email1 = ' email field cannot be empty. ';
    }
    if (!/^([a-z])([a-z0-9]+)@([a-z]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(email.trim())) {
      impropervalues.email2 = 'invalid email format';
    }
    if (!/(?!^[0]+$)^[0-9]{1,2}$/.test(tenor.trim())) {
      impropervalues.push(' tenor must be an integer between 1 and 12. e.g 12,5.');
    }
    if (((Number(tenor.trim())) > 12) || ((Number(tenor.trim())) < 1)) {
      impropervalues.tenor = ' tenor must be between 1 and 12';
    }
    if (!/^[0-9]{5,6}$/.test(amount.trim())) {
      impropervalues.amount1 = ' the least amount you can borrow is 10,000 and cannot contain "," and "."';
    }
    if (((Number(amount.trim())) % 10000) !== 0 || (Number(amount.trim())) > 100000) {
      impropervalues.amount2 = ' we only loan multiples of ten (10,000). and max. of 100,000';
    }
    return impropervalues;
  }

  static invalidLoanStatusValues(req) {
    const { status } = req.body;
    const impropervalues = {};
    if (!(/^approve$/i.test(status.trim()) || /^reject$/i.test(status.trim()))) {
      impropervalues.status = 'status field can only be either \'approve\' or \'reject\'.';
    }
    return impropervalues;
  }

  static invalidRepaymentValues(req) {
    const impropervalues = {};
    const { amount } = req.body;
    if (!/^[\d]+(\.[0-9]+)?$/.test(amount)) {
      impropervalues.amount = 'amount can only be either integer or float';
    }
    return impropervalues;
  }
}

class DataCreationValidator {
  static signupValidator(req, res, next) {
    const keys = ['firstName', 'lastName', 'address', 'email', 'password',
      'companyName', 'companyAddress', 'monthlyIncome',
      'bankName', 'bvn', 'accountNumber'];
    sendValidationInfo(
      res, req, keys, InvalidInputChecker.invalidSignupValues,
      next,
    );
  }

  static signinValidator(req, res, next) {
    const keys = ['email', 'password'];
    sendValidationInfo(
      res, req, keys, InvalidInputChecker.invalidSigninValue,
      next,
    );
  }

  static loanApplyValidator(req, res, next) {
    const keys = ['email', 'amount', 'tenor'];
    sendValidationInfo(
      res, req, keys, InvalidInputChecker.invalidLoanAppValues,
      next,
    );
  }

  static laonStatusValidator(req, res, next) {
    const keys = ['status'];
    sendValidationInfo(
      res, req, keys, InvalidInputChecker.invalidLoanStatusValues,
      next,
    );
  }

  static loanRepaymentValidator(req, res, next) {
    const keys = ['amount'];
    sendValidationInfo(
      res, req, keys, InvalidInputChecker.invalidRepaymentValues,
      next,
    );
  }
}

class DataQuery {
  static checkQueryStrings(req, res, next) {
    const { status, repaid } = req.query;
    if ((typeof status === 'undefined') && (typeof repaid === 'undefined')) {
      next();
    } else if (((typeof status === 'undefined') && (typeof repaid !== 'undefined'))
    || ((typeof status !== 'undefined') && (typeof repaid === 'undefined'))) {
      res.status(400).json({
        status: 400,
        error: 'both status and repaid query keys are required',
      });
    } else {
      const improperVals = {};
      if (!((/^approved$/i.test(status) || /^rejected$/i.test(status)))) {
        improperVals.status = 'status value must be a string of either approved or rejected';
      }
      if (!((/^true$/i.test(repaid)) || (/^false$/i.test(repaid)))) {
        improperVals.repaid = 'repaid value must be a string of either true or false';
      }
      if (Object.keys(improperVals).length === 0) {
        next();
      } else {
        res.status(400).json({
          status: 400,
          error: improperVals,
        });
      }
    }
  }
}

class loanDataCheck {
  static checkIdFormat(req, res, next) {
    const { loanId } = req.params;
    if (!/^[0-9]{1,10}$/.test(loanId.trim())) {
      const err = new Error('invalid id format');
      err.statusCode = 400;
      next(err);
    } else {
      next();
    }
  }

  static async applicationCheck(req, res, next) {
    const { email } = req.body;
    try {
      const applicant = await findUser(email.trim());
      const text = 'SELECT * FROM loans WHERE email=$1;';
      const { rows } = await db(text, [email.trim()]);
      let grantLoan = true;
      rows.forEach((loan) => {
        if (!(loan.repaid)) {
          grantLoan = false;
        }
        if (loan.status === 'rejected') {
          grantLoan = true;
        }
      });
      if (applicant === 'not found') {
        const err = new Error('user not in database');
        err.statusCode = 404;
        next(err);
      } else if (!grantLoan) {
        const err = new Error(`user '${email}' already has an outstanding loan.`);
        err.statusCode = 409;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkGetLoan(req, res, next) {
    const { loanId } = req.params;
    try {
      const specificLoan = await getSpecificLoan(loanId);
      if (specificLoan === 'not found') {
        const err = new Error('loan not in database');
        err.statusCode = 404;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { loanId } = req.params;
      const specificLoan = await getSpecificLoan(loanId);
      if (specificLoan === 'not found') {
        const err = new Error('loan not in database');
        err.statusCode = 404;
        next(err);
      } else if (specificLoan.status !== 'pending') {
        const err = new Error(`loan is already ${specificLoan.status}`);
        err.statusCode = 409;
        next(err);
      } else if (!/^reject$/i.test(status.trim())) {
        const user = await findUser(specificLoan.email);
        if (user.status === 'unverified') {
          const err = new Error('user is not yet verifed');
          err.statusCode = 400;
          next(err);
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async postRepaymentCheck(req, res, next) {
    const { amount } = req.body;
    const { loanId } = req.params;
    try {
      const specificLoan = await getSpecificLoan(loanId);
      if (specificLoan === 'not found') {
        const err = new Error('loan not found');
        err.statusCode = 404;
        next(err);
      } else if (specificLoan.status !== 'approved') {
        const err = new Error(`you cant post repayment for the loan '${loanId}' not yet approved`);
        err.statusCode = 400;
        next(err);
      } else if ((specificLoan.repaid)) {
        const err = new Error('loan already fully paid');
        err.statusCode = 409;
        next(err);
      } else if (!(Number(amount) <= specificLoan.balance)) {
        const err = new Error('repayed amount cannot be greater than loan balance');
        err.statusCode = 400;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkGetRepayment(req, res, next) {
    const { loanId } = req.params;
    try {
      const specificLoan = await getSpecificLoan(loanId);
      if (specificLoan === 'not found') {
        const err = new Error(`loan with id: ${loanId} not found`);
        err.statusCode = 404;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }
}

class UserDataCheck {
  static async checkSignupEmail(req, res, next) {
    const { email } = req.body;
    try {
      const text = 'SELECT * FROM users WHERE email=$1;';
      const result = await db(text, [email]);
      if (result.rows.length !== 0) {
        const err = new Error('email already exists');
        err.statusCode = 409;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static checkEmailFormat(req, res, next) {
    const { userEmail } = req.params;
    if (!/^([a-z])([a-z0-9]+)@([a-z]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/.test(userEmail.trim())) {
      const err = new Error('invalid email format');
      err.statusCode = 400;
      next(err);
    } else {
      next();
    }
  }

  static async checkSigninData(req, res, next) {
    const { email, password } = req.body;
    try {
      const text = 'SELECT * FROM users WHERE email=$1;';
      const { rows } = await db(text, [email.trim()]);
      if (rows.length === 0) {
        const err = new Error('user not in database');
        err.statusCode = 404;
        next(err);
      } else if (!(bcrypt.compareSync(password, rows[0].password))) {
        const err = new Error('invalid email or password');
        err.statusCode = 400;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkVerifyUser(req, res, next) {
    const { userEmail } = req.params;
    try {
      const userToVerify = await findUser(userEmail.trim());
      if (userToVerify === 'not found') {
        const err = new Error('user not in database');
        err.statusCode = 404;
        next(err);
      } else if (userToVerify.status === 'verified') {
        const err = new Error(`user '${userEmail}' already verified`);
        err.statusCode = 409;
        next(err);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkUploadPix(req, res, next) {
    const email = req.params.userEmail;
    try {
      const userToUpload = await findUser(email);
      if (userToUpload === 'not found') {
        const err = new Error('user not found');
        err.statusCode = 404;
        next(err);
      } else {
        uploads.single('image')(req, res, (error) => {
          if (typeof req.file === 'undefined') {
            const err = new Error('ensure image key is available and has an image value');
            err.statusCode = 400;
            next(err);
          } else {
            next();
          }
        });
      }
    } catch (e) {
      next(e);
    }
  }
}
export {
  DataCreationValidator,
  DataQuery,
  loanDataCheck,
  UserDataCheck,
};
