import express from 'express';
import { DataCreationValidator, DataQuery, loanDataCheck } from '../middlewares/validator';
import Loan from '../controllers/loanController';

const loan = express.Router();
const {
  loanApplyValidator,
  laonStatusValidator,
  loanRepaymentValidator,
} = DataCreationValidator;
const {
  apply,
  getLoan,
  changeStatus,
  postRepayment,
  getRepayHistory,
  getLoans,
} = Loan;
const { checkQueryStrings } = DataQuery;
const {
  applicationCheck,
  checkGetLoan,
  checkStatus,
  postRepaymentCheck,
  checkGetRepayment,
  checkIdFormat,
} = loanDataCheck;
loan.post('/', loanApplyValidator, applicationCheck, apply);
loan.get('/:loanId', checkIdFormat, checkGetLoan, getLoan);
loan.patch('/:loanId', checkIdFormat, laonStatusValidator, checkStatus, changeStatus);
loan.post('/:loanId/repayment', checkIdFormat, loanRepaymentValidator, postRepaymentCheck, postRepayment);
loan.get('/:loanId/repayments', checkIdFormat, checkGetRepayment, getRepayHistory);
loan.get('/', checkQueryStrings, getLoans);

export default loan;
