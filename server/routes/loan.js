import express from 'express';
import DataCreationValidator from '../middlewares/validator';
import Loan from '../controllers/loanController';

const loan = express.Router();
const { loanApplyValidator } = DataCreationValidator;
const { apply, getLoan } = Loan;

loan.post('/', loanApplyValidator, apply);
loan.get('/:loanId([0-9]+)', getLoan);

export default loan;