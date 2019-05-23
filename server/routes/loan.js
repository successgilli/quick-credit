import express from 'express';
import { DataCreationValidator, DataQuery, loanDataCheck } from '../middlewares/validator';
import checkToken from '../middlewares/checkToken';
import checkClient from '../middlewares/checkClient';
import Loan from '../controllers/loanController';

const { isAdmin, isUser } = checkClient;

const loan = express.Router();
const {
  loanApplyValidator,
  loanStatusValidator,
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
loan.post('/', loanApplyValidator, applicationCheck, checkToken, isUser, apply);
loan.get('/:loanId', checkIdFormat, checkGetLoan, checkToken, isAdmin, getLoan);
loan.patch('/:loanId', checkIdFormat, loanStatusValidator, checkStatus, checkToken, isAdmin, changeStatus);
loan.post('/:loanId/repayment', checkIdFormat, loanRepaymentValidator, postRepaymentCheck, checkToken, isAdmin, postRepayment);
loan.get('/:loanId/repayments', checkIdFormat, checkGetRepayment, checkToken, isUser, getRepayHistory);
loan.get('/', checkQueryStrings, checkToken, isAdmin, getLoans);

export default loan;
