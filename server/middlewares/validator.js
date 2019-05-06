/* eslint-disable linebreak-style */
import sendValidationInfo from '../helpers/validatorHelper';

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
}

export default DataCreationValidator;
