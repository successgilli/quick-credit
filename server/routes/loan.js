import express from 'express';
import DataCreationValidator from '../middlewares/validator';
import Loan from '../controllers/loanController';

const loan = express.Router();
const { loanApplyValidator, laonStatusValidator } = DataCreationValidator;
const { apply, getLoan, changeStatus } = Loan;

loan.post('/', loanApplyValidator, apply);
loan.get('/:loanId([0-9]+)', getLoan);
loan.patch('/:loanId([0-9]+)', laonStatusValidator, changeStatus);

export default loan;