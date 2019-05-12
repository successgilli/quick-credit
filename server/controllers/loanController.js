import db from '../model/db';
import mailer from '../helpers/mailer';

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
      });// if no outstanding loan.
      if (grantLoan) {
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

  static changeStatus(req, res) {
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
      res.status(400).json({
        status: 400,
        error: 'loan not in database',
      });
    } else {
      // check loan status if pending else dont change status.
      // eslint-disable-next-line no-lonely-if
      if (specificLoan.status === 'pending') {
        if (/^reject$/i.test(status.trim())) {
          db[loanIndex].status = 'rejected';
          const data = {
            loanId: specificLoan.id,
            loanAmount: specificLoan.amount,
            tenor: specificLoan.tenor,
            status: db[loanIndex].status,
            monthlyInstallment: specificLoan.paymentInstallment,
            interest: specificLoan.interest,
          };
          mailer(specificLoan.user, 'rejected', data)
          res.status(201).json({
            status: 201,
            data,
          });
        } else {
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
          if (verified) {
            db[loanIndex].status = 'approved';
            const data = {
              loanId: specificLoan.id,
              loanAmount: specificLoan.amount,
              tenor: specificLoan.tenor,
              status: db[loanIndex].status,
              monthlyInstallment: specificLoan.paymentInstallment,
              interest: specificLoan.interest,
            };
            mailer(specificLoan.user, 'approved', data)
            res.status(201).json({
              status: 201,
              data,
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'user is not yet verifed',
            });
          }
        }
      } else {
        res.status(400).json({
          status: 400,
          error: `loan is already ${db[loanIndex].status}`,
        });
      }
    }
  }

  static postRepayment(req, res) {
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
      res.status(400).json({
        status: 400,
        error: 'loan not found',
      });
    } else {
      // check if loan is approved.
      // eslint-disable-next-line no-lonely-if
      if (db[loanIndex].status === 'approved') {
        if (!(db[loanIndex].repaid)) { // check if loan is already repaid.
          if (Number(amount) <= db[loanIndex].balance) { // check if amount to repay is less than balance
            // change balance of loan in db by removing amount paid from balance.
            db[loanIndex].balance -= Number(amount);
            if (db[loanIndex].balance === 0) { // check if loan is fully paid.
              db[loanIndex].repaid = true;
            } // put repayment in database.
            const repayment = {
              id: Math.floor(Math.random() * 100000),
              createdOn: Date.now(),
              loanId: Number(loanId),
              amount: Number(amount),
              type: 'repayment',
            };
            db.push(repayment);
            res.status(201).json({
              status: 201,
              data: {
                id: repayment.id,
                loanId: db[loanIndex].id,
                createdOn: db[loanIndex].createdOn,
                amount: db[loanIndex].amount,
                monthlyInstallment: db[loanIndex].paymentInstallment,
                paidAmount: amount,
                balance: db[loanIndex].balance,
              },
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'repayed amount cannot be greater than loan balance',
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            error: 'loan already fully paid',
          });
        }  
      } else {
        res.status(400).json({
          status: 400,
          error: `you cant post repayment for the loan '${loanId}' not yet approved`,
        });
      }
    }
  }

  static getRepayHistory(req, res) {
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
    // if loan not found,
    if ( specificLoan !== 'not found') {
      // query repayments with loanId in db.
      const repayments = []; // array to colate repayments.
      let specificRepayment;
      db.forEach((repayment) => {
        if (repayment.type === 'repayment') {
          if (repayment.loanId === Number(loanId)) {
            specificRepayment = repayment;
            specificRepayment.monthlyInstallment = specificLoan.paymentInstallment;
            repayments.push(specificRepayment);
          }
        }
      });
      // check if any repayment history exists.
      if (repayments.length !== 0) {
        res.status(200).json({
          status: 200,
          data: repayments,
        });
      } else {
        res.status(400).json({
          status: 400,
          error: `loan with id: ${loanId} has no repayment`,
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: `loan with id: ${loanId} not found`,
      });
    }
  }

  static getLoans(req, res) {
    const { status, repaid } = req.query;
    // query db for all loans.
    const loans = []; // to colate loans.
    db.forEach((loan) => {
      if (loan.type === 'loan') {
        loans.push(loan);
      }
    })
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
