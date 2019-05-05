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
    })
  })
  it('should respond with invalid username/password', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('invalid email or password');
      done();
    })
  })
  it('should respond with password cant be empty', (done) => {
    userData.signinInDbBadPWord.password = '';// empty password field.
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    })
  })
  it('should respond with email field cant be empty', (done) => {
    userData.signinInDbBadPWord.email = '';// empty password field.
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinInDbBadPWord).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    })
  })
  it('should respond user details on seuccesful signin', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send(userData.signinValid).end((err, res) => {
      res.body.status.should.equal(200);
      res.body.should.have.property('data');
      done();
    })
  })
})
// test verify user route.
describe('test verify user route', () => {
  it ('should return error for bad email parameter', (done) => {
    chai.request(server).patch('/api/v1/users/%/verify').end((err, res) => {
      res.body.status.should.equal(404);
      res.body.error.should.equal('route does not exist. check the route');
      done();
    })
  })
  it ('should return user verified', (done) => {
    chai.request(server).patch('/api/v1/users/successgilli@gmail.com/verify').end((err, res) => {
      res.body.status.should.equal(200);
      res.body.data.status.should.equal('verified');
      done();
    })
  })
  it ('should return error if user already verified', (done) => {
    chai.request(server).patch('/api/v1/users/successgilli@gmail.com/verify').end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('user \'successgilli@gmail.com\' already verified');
      done();
    })
  })
})
