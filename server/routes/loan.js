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
  getUserLoan,
} = Loan;
const { checkQueryStrings } = DataQuery;
const {
  isParticularUser,
  applicationCheck,
  checkGetLoan,
  checkStatus,
  postRepaymentCheck,
  checkGetRepayment,
  checkIdFormat,
} = loanDataCheck;
loan.get('/user', checkToken, isUser, getUserLoan);
loan.post('/', loanApplyValidator, checkToken, isUser, applicationCheck, apply);
loan.get('/:loanId', checkIdFormat, checkGetLoan, checkToken, isParticularUser, getLoan);
loan.patch('/:loanId', checkIdFormat, loanStatusValidator, checkStatus, checkToken, isAdmin, changeStatus);
loan.post('/:loanId/repayment', checkIdFormat, loanRepaymentValidator, postRepaymentCheck, checkToken, isAdmin, postRepayment);
loan.get('/:loanId/repayments', checkIdFormat, checkGetRepayment, checkToken, isParticularUser, getRepayHistory);
loan.get('/', checkQueryStrings, checkToken, isAdmin, getLoans);

export default loan;
