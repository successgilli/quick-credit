import express from 'express';
import { DataCreationValidator, DataQuery } from '../middlewares/validator';
import Loan from '../controllers/loanController';

const loan = express.Router();
const { loanApplyValidator, laonStatusValidator, loanRepaymentValidator } = DataCreationValidator;
const { apply, getLoan, changeStatus, postRepayment, getRepayHistory, getLoans } = Loan;
const { checkQueryStrings } = DataQuery;
loan.post('/', loanApplyValidator, apply);
loan.get('/:loanId([0-9]+)', getLoan);
loan.patch('/:loanId([0-9]+)', laonStatusValidator, changeStatus);
loan.post('/:loanId([0-9]+)/repayment', loanRepaymentValidator, postRepayment);
loan.get('/:loanId([0-9]+)/repayments', getRepayHistory);
loan.get('/', checkQueryStrings, getLoans);

export default loan;