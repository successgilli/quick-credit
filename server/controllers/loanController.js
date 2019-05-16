import 'babel-polyfill';
import db from '../model/db';
import mailer from '../helpers/mailer';
import UserHelper from '../helpers/userHelper';
import LoanHelper from '../helpers/loanHelpers';

const { findUser } = UserHelper;
const {
  createLoan,
  getSpecificLoan,
  rejectLoan,
  acceptLoan,
  updateBalance,
  colateRepayment,
  colateLoan,
} = LoanHelper;

class Loans {
  static async apply(req, res) {
    const { email, tenor, amount } = req.body;
    const applicant = findUser(email);
    const loan = await createLoan(email, amount, tenor);
    db.push(loan);
    res.status(201).json({
      status: 201,
      data: {
        loanId: loan.id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: loan.user,
        tenor: loan.tenor,
        amount: loan.amount,
        paymentInstallment: loan.paymentInstallment,
        status: loan.status,
        balance: loan.balance,
        interest: loan.interest,
      },
    });  
  }

  static getLoan(req, res) {
    const { loanId } = req.params;// query loanId in db.
    res.status(200).json({
      status: 200,
      data: getSpecificLoan(loanId)[0],
    });
  }

  static changeStatus(req, res) {
    const { status } = req.body;
    const { loanId } = req.params;
    const specificLoan = getSpecificLoan(loanId)[0];
    const loanIndex = getSpecificLoan(loanId)[1];
    if (/^reject$/i.test(status.trim())) {
      mailer(specificLoan.user, 'rejected', rejectLoan(loanIndex, specificLoan))
      res.status(201).json({
        status: 201,
        data: rejectLoan(loanIndex, specificLoan),
      });
    } else {
      mailer(specificLoan.user, 'approved', acceptLoan(loanIndex, specificLoan))
      res.status(201).json({
        status: 201,
        data: acceptLoan(loanIndex, specificLoan),
      });
    }
  }

  static postRepayment(req, res) {
    const { amount } = req.body;
    const { loanId } = req.params;
    // query loanId in db.
    const loanIndex = getSpecificLoan(loanId)[1];
    db.push(updateBalance(loanIndex, amount));
    res.status(201).json({
      status: 201,
      data: {
        id: updateBalance(loanIndex, amount).id,
        loanId: db[loanIndex].id,
        createdOn: db[loanIndex].createdOn,
        amount: db[loanIndex].amount,
        monthlyInstallment: db[loanIndex].paymentInstallment,
        paidAmount: amount,
        balance: db[loanIndex].balance,
      },
    });      
  }

  static getRepayHistory(req, res) {
    const { loanId } = req.params;
    // query loanId in db.
    const specificLoan = getSpecificLoan(loanId)[0];
    res.status(200).json({
      status: 200,
      data: colateRepayment(specificLoan),
    });
  }

  static getLoans(req, res) {
    const { status, repaid } = req.query;
    const loans = colateLoan();
    if ((typeof status === 'undefined') && (typeof repaid === 'undefined')) {
      res.status(200).json({
        status: 200,
        data: loans,
      })
    } else {
      const queriedLoans = []; // store loans queried.
      let repaidBoolean;
      if (repaid === 'true') {
        repaidBoolean = true;
      } else {
        repaidBoolean = false;
      }
      loans.forEach((loan) => { // search based on query strings.
        if ((loan.status === status) && ((loan.repaid) === repaidBoolean)) {
          queriedLoans.push(loan);
        }
      })
      res.status(200).json({
        status: 200,
        data: queriedLoans,
      })
    }
  }
}

export default Loans;
