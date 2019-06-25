import 'babel-polyfill';
import db from '../model/query';
import mailer from '../helpers/mailer';
import UserHelper from '../helpers/userHelper';
import LoanHelper from '../helpers/loanHelpers';

const { findUser, getUser } = UserHelper;
const {
  createLoan,
  getSpecificLoan,
  rejectLoan,
  acceptLoan,
  updateBalance,
} = LoanHelper;

class Loans {
  static async apply(req, res, next) {
    try {
      const { tenor, amount } = req.body;
      const { email } = await getUser(req.user);
      const applicant = await findUser(email);
      const loan = await createLoan(email, amount, tenor);
      res.status(201).json({
        status: 201,
        data: {
          loanId: loan.id,
          firstName: applicant.firstname,
          lastName: applicant.lastname,
          email: loan.user,
          tenor: loan.tenor,
          amount: loan.amount,
          paymentinstallment: loan.paymentinstallment,
          status: loan.status,
          balance: loan.balance,
          interest: loan.interest,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async getLoan(req, res, next) {
    const { loanId } = req.params;// query loanId in db.
    try {
      const loan = await getSpecificLoan(loanId.trim())
      res.status(200).json({
        status: 200,
        data: loan,
      });
    } catch (e) {
      next(e);
    }
  }

  static async changeStatus(req, res, next) {
    const { status } = req.body;
    const { loanId } = req.params;
    try {
      const specificLoan = await getSpecificLoan(loanId);
      if (/^reject$/i.test(status.trim())) {
        const loanRejectRes = await rejectLoan(specificLoan);
        mailer(specificLoan.user, 'rejected', loanRejectRes);
        res.status(201).json({
          status: 201,
          data: loanRejectRes,
        });
      } else {
        const loanAcceptRes = await acceptLoan(specificLoan);
        mailer(specificLoan.user, 'approved', loanAcceptRes);
        res.status(201).json({
          status: 201,
          data: loanAcceptRes,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  static async postRepayment(req, res, next) {
    try {
      const { amount } = req.body;
      const { loanId } = req.params;
      // query loanId in db.
      const specificLoan = await getSpecificLoan(loanId);
      const text = 'INSERT INTO repayments (loanid, amount) VALUES ($1,$2) RETURNING *;';
      const { rows } = await db(text, [specificLoan.id, Number(amount.trim())]);
      const data = await updateBalance(specificLoan, amount);
      data.id = rows[0].id;
      res.status(201).json({
        status: 201,
        data,
      });
    } catch (e) {
      const err = new Error(e.message);
      err.statusCode = 500;
      next(err);
    }
  }

  static async getRepayHistory(req, res, next) {
    const { loanId } = req.params;
    try {
      const text = 'SELECT * FROM repayments WHERE loanid=$1;';
      const { rows } = await db(text, [loanId.trim()]);
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (e) {
      const err = new Error(e.message);
      err.statusCode = 500;
      next(err);
    }
  }

  static async getLoans(req, res, next) {
    const { status, repaid } = req.query;
    try {
      if ((typeof status === 'undefined') && (typeof repaid === 'undefined')) {
        const { rows } = await db('SELECT * FROM loans');
        res.status(200).json({
          status: 200,
          data: rows,
        });
      } else {
        const text = 'SELECT * FROM loans WHERE status=$1 AND repaid=$2';
        const { rows } = await db(text, [status, repaid]);
        res.status(200).json({
          status: 200,
          data: rows,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  static async getUserLoan(req, res, next) {
    try {
      const user = req.email;
      const text = 'SELECT * FROM loans WHERE email=$1';
      const param = [user];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(200).json({
          status: 200,
          error: 'no loans yet',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default Loans;
