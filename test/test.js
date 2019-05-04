import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import userData from '../server/model/mock';

const should = chai.should();
chai.use(chaiHttp);

// test signup
describe('test sign up inputs', () => {
  it('should enter the user into the database', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.user).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(200);
      console.log(res.body)
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
      console.log(res.body)
      done();
    });
  });
  it('check if first name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserFirstName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if last name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserLastName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if address is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserAddress).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if email is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserEmail).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if bvn is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserbvn).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if bank name is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.baduserBankName).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if company address is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.usercompanyAddress).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if account number is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.badUserAcctNo).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done();
    });
  });
  it('check if monthly income is properly inputed', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.badUsermonthlyIncome).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(400);
      console.log(res.body);
      done(); 
    });
  });
});
