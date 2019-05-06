import express from 'express';
import DataCreationValidator from '../middlewares/validator';
import Loan from '../controllers/loanController';

const loan = express.Router();
const { loanApplyValidator, laonStatusValidator, loanRepaymentValidator } = DataCreationValidator;
const { apply, getLoan, changeStatus, postRepayment } = Loan;

loan.post('/', loanApplyValidator, apply);
loan.get('/:loanId([0-9]+)', getLoan);
loan.patch('/:loanId([0-9]+)', laonStatusValidator, changeStatus);
loan.post('/:loanId([0-9]+)/repayment', loanRepaymentValidator, postRepayment)

export default loan;