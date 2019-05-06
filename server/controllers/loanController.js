import db from '../model/db';

class Loans {
  static apply(req, res) {
    const { email, tenor, amount } = req.body;
    // check db if user is present.
    let applicant = 'not found';
    db.forEach((user) => {
      if (user.type === 'user') {
        if (user.user === email.trim()) {
          applicant = user;
        }
      }
    });
    // if user not found in db.
    if (applicant === 'not found') {
      res.status(400).json({
        status: 400,
        error: 'user not in database',
      });
    } else {
      // check if user has an outstanding loan.
      let grantLoan = false;
      db.forEach((loan) => {
        if (loan.type === 'loan') {
          if (loan.user === email.trim()) {
            if (loan.repaid) {
              grantLoan = true;
            }
          }
        }
      });// if no outstanding loan.
      if (!grantLoan) {
        const amountFloat = parseFloat(amount);
        const loan = {
          id: Math.floor(Math.random() * 100000),
          user: email.trim(),
          createdOn: Date.now(),
          status: 'pending',
          repaid: 'false',
          tenor: `${tenor} Month(s)`,
          amount: amountFloat,
          paymentInstallment: (amountFloat + (0.05 * amountFloat)) / Number(tenor),
          balance: amountFloat + (0.05 * amountFloat),
          interest: 0.05 * amountFloat,
          type: 'loan',
        };
        // put loan application in db.
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
      } else {
        res.status(400).json({
          status: 400,
          error: `user '${email}' already has an outstanding loan.`,
        });
      }
    }
  }

  static getLoan(req, res) {
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
      res.status(400).json({
        status: 400,
        error: 'loan not in database',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: specificLoan,
      });
    }
  }
}

export default Loans;