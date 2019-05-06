import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import userData from '../server/model/mock';

const should = chai.should();
chai.use(chaiHttp);
let loanId;
// test signup
describe('test sign up inputs', () => {
  it('should enter the user into the database', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.user).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(200);
      done();
    });
  });
  // push same email again into database.
  it('should check if email is present', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.user).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(403);
      done();
    });
  });
  it('check if first name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserFirstName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if first name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserFirstName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if last name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserLastName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if address is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserAddress).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if email is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserEmail).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if bvn is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserbvn).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if bank name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserBankName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if company address is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.usercompanyAddress).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if account number is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.badUserAcctNo).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
  it('check if monthly income is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.badUsermonthlyIncome).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      done();
    });
  });
});

describe('testing signin', () => {
  it('should respond with user not in db if user not in db', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinnotInDb).end((err, res) => {
      res.body.status.should.equal(403);
      res.body.error.should.equal('user not in database');
      done();
    });
  });
  it('should respond with invalid username/password', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('invalid email or password');
      done();
    });
  });
  it('should respond with password cant be empty', (done) => {
    userData.signinInDbBadPWord.password = '';// empty password field.
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    });
  });
  it('should respond with email field cant be empty', (done) => {
    userData.signinInDbBadPWord.email = '';// empty password field.
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    });
  });
  it('should respond user details on seuccesful signin', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinValid).end((err, res) => {
      res.body.status.should.equal(200);
      res.body.should.have.property('data');
      done();
    });
  });
});
// test verify user route.
describe('test verify user route', () => {
  it('should return error for bad email parameter', (done) => {
    chai.request(server).patch('/api/v1/users/%/verify').end((err, res) => {
      res.body.status.should.equal(404);
      res.body.error.should.equal('route does not exist. check the route');
      done();
    });
  });
  it('should return user verified', (done) => {
    chai.request(server).patch('/api/v1/users/successgilli@gmail.com/verify').end((err, res) => {
      res.body.status.should.equal(200);
      res.body.data.status.should.equal('verified');
      done();
    });
  });
  it('should return error if user already verified', (done) => {
    chai.request(server).patch('/api/v1/users/successgilli@gmail.com/verify').end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('user \'successgilli@gmail.com\' already verified');
      done();
    });
  });
});
// test create loan application
describe('loan application route', () => {
  it('it should return user not found if user not found', (done) => {
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppNoUser).end((err, res) => {
      res.body.error.should.equal('user not in database');
      done();
    });
  });
  it('it should post loan application to db', (done) => {
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('data');
      res.body.status.should.equal(201);
      // eslint-disable-next-line prefer-destructuring
      loanId = res.body.data.loanId;
      done();
    });
  });
  it('it should reject application if user has outstanding loan', (done) => {
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('error');
      res.body.status.should.equal(400);
      done();
    });
  });
  it('it should validate input email field', (done) => {
    userData.loanAppGood.email = '';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('error');
      res.body.status.should.equal(400);
      done();
    });
  });
  it('it should validate input tenor field', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    userData.loanAppGood.tenor = '';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('error');
      res.body.status.should.equal(400);
      done();
    });
  });
  it('it should validate input amount field', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    userData.loanAppGood.tenor = '8';
    userData.loanAppGood.amount = '20';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('error');
      res.body.status.should.equal(400);
      done();
    });
  });
});
// test get specific loan route.
describe('get specific loan route', () => {
  it('should respond with "not found" if loanId not found', (done) => {
    chai.request(server).get('/api/v1/loans/100000000000').end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('loan not in database');
      done();
    });
  });
  it('should respond with the specific loan if found', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId}`).end((err, res) => {
      res.body.status.should.equal(200);
      res.body.should.have.property('data');
      done();
    });
  });
});
