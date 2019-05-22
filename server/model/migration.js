import 'babel-polyfill'
import db from './query';
import seedAdmin from '../helpers/createAdmin';

const userTable = `CREATE TABLE IF NOT EXISTS users ( id serial NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    password VARCHAR(300) NOT NULL,
    companyaddress VARCHAR(100) NOT NULL,
    companyname VARCHAR(100) NOT NULL,
    bvn VARCHAR(100) NOT NULL,
    bankname VARCHAR(100) NOT NULL,
    accountnumber VARCHAR(100) NOT NULL,
    monthlyincome INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'unverified',
    passporturl VARCHAR(300),
    isAdmin BOOLEAN DEFAULT false);`;
const loanTable = `CREATE TABLE IF NOT EXISTS loans ( id serial NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL REFERENCES users(email),
    createdOn DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'pending',
    repaid BOOLEAN DEFAULT false,
    tenor INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    paymentInstallment FLOAT NOT NULL,
    balance FLOAT NOT NULL,
    interest FLOAT NOT NULL);`;
const repaymentTable = `CREATE TABLE IF NOT EXISTS repayments (
  id serial NOT NULL,
  createdOn DATE DEFAULT CURRENT_DATE,
  loanId INTEGER NOT NULL REFERENCES loans(id),
  amount FLOAT NOT NULL,
  PRIMARY KEY (loanId, id)
);`;

const createTables = async () => {
  try {
    db(`${userTable} ${loanTable} ${repaymentTable}`);
    await seedAdmin();
    console.log('tables created');
  }
  catch (err) {
    console.log(err);
  }
}

export default createTables;
