import 'babel-polyfill';
import db from '../model/query'

class LoanHelper {

  static async createLoan(email, amount, tenor) {
    const amountFloat = parseFloat(amount);
    const param = [
      email.trim(),
      tenor.trim(),
      amount.trim(),
      (amountFloat + (0.05 * amountFloat)) / Number(tenor),
      (amountFloat + (0.05 * amountFloat)),
      (0.05 * amountFloat),
    ];
    const text = `INSERT INTO loans (
      userr,
      tenor,
      amount,
      paymentinstallment,
      balance,
      interest
      ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    const { rows } = await db(text, param);
    return rows[0];
  }

  static async getSpecificLoan(loanId) {
    const text = 'SELECT * FROM loans WHERE id=$1;';
    const { rows } = await db(text, [loanId.trim()]);
    if (rows.length === 0) {
      return 'not found';
    }
    return rows[0];
  }

  static async rejectLoan(loan) {
    const text = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *;';
    const { rows } = await db(text, ['rejected', loan.id]);
    const data = {
      loanId: rows[0].id,
      loanAmount: rows[0].amount,
      tenor: rows[0].tenor,
      status: rows[0].status,
      monthlyInstallment: rows[0].paymentinstallment,
      interest: rows[0].interest,
    };
    return data;
  }

  static async acceptLoan(loan) {
    const text = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *;';
    const { rows } = await db(text, ['approved', loan.id]);
    const data = {
      loanId: rows[0].id,
      loanAmount: rows[0].amount,
      tenor: rows[0].tenor,
      status: rows[0].status,
      monthlyInstallment: rows[0].paymentinstallment,
      interest: rows[0].interest,
    };
    return data;
  }

  static async updateBalance(loan, amount) {
    const balance = loan.balance - Number(amount);
    const text = 'UPDATE loans SET balance=$1 WHERE id=$2 RETURNING *;';
    const { rows } = await db(text, [balance, loan.id]);
    if (rows[0].balance === 0) { // check if loan is fully paid.
      const text2 = 'UPDATE loans SET repaid=$1 WHERE id=$2';
      const { rows } = await db(text2, [true, loan.id]);
    } // put repayment in database.
    const repayment = {
      loanId: rows[0].id,
      createdOn: rows[0].createdon,
      amount: rows[0].amount,
      monthlyInstallment: rows[0].paymentinstallment,
      paidAmount: amount,
      balance: rows[0].balance,
    };
    return repayment;
  }
} 

export default LoanHelper;
