import db from '../model/db'

class LoanHelper {

  static async createLoan(email, amount, tenor) {
    const amountFloat = parseFloat(amount);
    const loan = {
      id: Math.floor(Math.random() * 100000),
      user: email.trim(),
      createdOn: Date.now(),
      status: 'pending',
      repaid: false,
      tenor: `${tenor} Month(s)`,
      amount: amountFloat,
      paymentInstallment: (amountFloat + (0.05 * amountFloat)) / Number(tenor),
      balance: amountFloat + (0.05 * amountFloat),
      interest: 0.05 * amountFloat,
      type: 'loan',
    };
    return loan;
  }

  static getSpecificLoan(loanId) {
    let specificLoan;
    let loanIndex;
    db.forEach((loan, index) => {
      if (loan.type === 'loan') {
        if (loan.id === Number(loanId)) {
          specificLoan = loan;
          loanIndex = index;
        }
      }
    });
    return [specificLoan, loanIndex];
  }

  static rejectLoan(loanIndex, loan) {
    db[loanIndex].status = 'rejected';
    const data = {
      loanId: loan.id,
      loanAmount: loan.amount,
      tenor: loan.tenor,
      status: db[loanIndex].status,
      monthlyInstallment: loan.paymentInstallment,
      interest: loan.interest,
    };
    return data;
  }

  static acceptLoan(loanIndex, loan) {
    db[loanIndex].status = 'approved';
    const data = {
      loanId: loan.id,
      loanAmount: loan.amount,
      tenor: loan.tenor,
      status: db[loanIndex].status,
      monthlyInstallment: loan.paymentInstallment,
      interest: loan.interest,
    };
    return data;
  }

  static updateBalance(loanIndex, amount) {
    db[loanIndex].balance -= Number(amount);
    if (db[loanIndex].balance === 0) { // check if loan is fully paid.
      db[loanIndex].repaid = true;
    } // put repayment in database.
    const repayment = {
      id: Math.floor(Math.random() * 100000),
      createdOn: Date.now(),
      loanId: Number(db[loanIndex].id),
      amount: Number(amount),
      type: 'repayment',
    };
    return repayment;
  }

  static colateRepayment(loan) {
    const repayments = [];
    let specificRepayment;
    db.forEach((repayment) => {
      if (repayment.type === 'repayment') {
        if (repayment.loanId === Number(loan.id)) {
          specificRepayment = repayment;
          specificRepayment.monthlyInstallment = loan.paymentInstallment;
          repayments.push(specificRepayment);
        }
      }
    });
    return repayments;
  }

  static colateLoan() {
    const loans = []; // to colate loans.
    db.forEach((loan) => {
      if (loan.type === 'loan') {
        loans.push(loan);
      }
    })
    return loans;
  }
}

export default LoanHelper;
