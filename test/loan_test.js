import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import server from '../server/app';
import userData from '../server/model/mock';
import db from '../server/model/query';
import seedAdmin from '../server/model/createTestAdmin';

const should = chai.should();
chai.use(chaiHttp);
let loanId; let loanId2;
let userAuth1;
let userAuth2;
let userAuth3;
let adminAuth;

// test create loan application.
describe('loan application route', () => {
  before( async () => {
    await seedAdmin();
  })
  before( async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userData.signinAdmin);
    adminAuth = res.body.data.token;
  })
  before('seed database1', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.user);
    userAuth1 = res.body.data.token;
  });
  before('seed database1', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.user2);
    userAuth2 = res.body.data.token;
  });
  before('seed database1', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.user3);
    userAuth3 = res.body.data.token;
  });
  before('seed database2', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.anodaUser);
  });
  before('seed database2', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/users/successgilli@gmail.com/verify')
      .set('Authorization', adminAuth);
  });
  before('seed database2', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/users/successgilli44@gmail.com/verify')
      .set('Authorization', adminAuth);
  });
  it('it should post loan application to db', (done) => {
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth1)
      .end((err, res) => {
        console.log(res.body, 'loanthis')
        res.body.should.have.property('data');
        res.body.status.should.equal(201);
        // eslint-disable-next-line prefer-destructuring
        loanId = res.body.data.loanId;
        done();
      });
  });
  it('it should post another loan application to db', (done) => {
    userData.loanAppGood.email = 'success@gmail.com';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth2)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.status.should.equal(201);
        // eslint-disable-next-line prefer-destructuring
        done();
      });
  });
  it('it should post another loan application to db', (done) => {
    userData.loanAppGood.email = 'success@gmail.com';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth3)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.status.should.equal(201);
        // eslint-disable-next-line prefer-destructuring
        loanId2 = res.body.data.loanId;
        done();
      });
  });
  it('it should reject application if user has outstanding loan', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth1)
      .end((err, res) => {
        console.log(res.body, 'this')
        res.body.should.have.property('error');
        res.body.status.should.equal(409);
        done();
      });
  });
  it('it should validate input tenor field', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    userData.loanAppGood.tenor = '';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth1)
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should validate input amount field', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    userData.loanAppGood.tenor = '8';
    userData.loanAppGood.amount = '20';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).set('Authorization', userAuth1)
      .end((err, res) => {
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        done();
      });
  });
});
// test get specific loan route.
describe('get specific loan route', () => {
  it('should respond with loan not found if not found', (done) => {
    chai.request(server).get('/api/v1/loans/10').set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body, 'getspec')
        res.body.status.should.equal(404);
        res.body.error.should.equal('loan not in database');
        done();
      })
  })
  it('should respond with "invalid id" if loanId not integer', (done) => {
    chai.request(server).get('/api/v1/loans/100000000000').set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('invalid id format');
        done();
      });
  });
  it('should respond with the specific loan if found', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId}`).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        done();
      });
  });
});
// test aprove/reject loan route. 
describe('approve/reject loan route', () => {
  it('should respond with "invalid id" if loanId not integer', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('invalid id format');
        done();
      });
  });
  it('should respond with "not found" if loanId not found', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch('/api/v1/loans/10').send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(404);
        res.body.error.should.equal('loan not in database');
        done();
      });
  });
  it('should respond with ensure status is either approve or reject', (done) => {
    let status = { status: 'approveg' };
    chai.request(server).patch('/api/v1/loans/10').send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        done();
      });
  });
  it('should respond with validate input for either approve or reject', (done) => {
    let status = { status: '' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        done();
      });
  });
  it('should require status field', (done) => {
    let status = { armpit: '' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        done();
      });
  });
  it('should approve loan of a verifed user', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId}`).send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body,'thisone')
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should not approve or reject a loan already approved or rejected', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId}`).send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(409);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not approve the loan of a user not verified', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId2}`).send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body, 'verify');
        res.body.status.should.equal(400);
        res.body.error.should.equal('user is not yet verifed');
        done();
      });
  });
  it('should be able to reject loan application', (done) => {
    let status = { status: 'reject' };
    chai.request(server).patch(`/api/v1/loans/${loanId2}`).send(status).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        done();
      });
  });
}); 

// test post repayment route
describe('post loan repayment route', () => {
  let input = { amount: 'er' };
  it('should validate input amount', (done) => {
    chai.request(server).post('/api/v1/loans/12323/repayment')
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body)
        res.body.status.should.equal(400);
        done();
      })
  })
  it('should respond with ivalid id if id not of required type', (done) => {
    input = { amount: '2000' };
    chai.request(server).post('/api/v1/loans/12323000000/repayment')
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('invalid id format');
        done();
      })
  })
  it('should respond with loan not found if not found', (done) => {
    input = { amount: '2000' };
    chai.request(server).post('/api/v1/loans/10/repayment')
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(404);
        res.body.error.should.equal('loan not found');
        done();
      })
  })
  it('should not post repayment for rejected or pending loan', (done) => {
    input = { amount: '2000' };
    chai.request(server).post(`/api/v1/loans/${loanId2}/repayment`)
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal(`you cant post repayment for the loan '${loanId2}' not yet approved`);
        done();
      })
  })
  it('should not post repayment for amount greater than loan balance', (done) => {
    input = { amount: '70000' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('repayed amount cannot be greater than loan balance');
        done();
      })
  })
  it('should post loan into repayment db', (done) => {
    input = { amount: '31500' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        done();
      })
  })
  it('should tell if repayment already complete and not repay', (done) => {
    input = { amount: '31500' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.status.should.equal(409);
        res.body.error.should.equal('loan already fully paid');
        done();
      })
  })
})
// test view repayment history route.
describe('Get repayment history route', () => {
  it('should respond loan not found if loan id not in db', (done) => {
    chai.request(server).get(`/api/v1/loans/1000000000/repayments`).set('Authorization', userAuth1)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.error.should.equal('loan with id: 1000000000 not found');
        done();
      })
  })
  it('should respond with no repayment message if loan has no repayment yet', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId2}/repayments`).set('Authorization', userAuth3)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      })
  })
  it('should respond with loan repayment if loanId found in db', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId}/repayments`).set('Authorization', userAuth1)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      })
  })
})
// test get loans route.
describe('GET loans route', () => {
  it('should return error if only one query string is given', (done) => {
    chai.request(server).get('/api/v1/loans?status').set('Authorization', adminAuth).end((err, res) => {
      res.body.error.should.equal('both status and repaid query keys are required');
      done();
    })
  })
  it('should return error if query keys have wrong values', (done) => {
    chai.request(server).get('/api/v1/loans?status=armpit&repaid=bearbear').set('Authorization', adminAuth)
      .end((err, res) => {
        res.body.error.should.be.a('object');
        done();
      })
  })
  it('should return all loans in db if no query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans').set('Authorization', adminAuth).end((err, res) => {
      res.body.should.have.property('data')
      done();
    })
  })
  it('should return queried loans in db if query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans?status=approved&repaid=false').set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('data')
        done();
      })
  })
  it('should return queried loans in db if query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans?status=approved&repaid=true').set('Authorization', adminAuth)
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('data')
        done();
      })
  })
})

// get user loan
describe('get user loan', () => {
  it('it should get .all user loans from db', (done) => {
    chai.request(server).get('/api/v1/loans/user').set('Authorization', userAuth2)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.status.should.equal(200);
        // eslint-disable-next-line prefer-destructuring
        done();
      });
  });
});

describe('test the upload picture route', () => {
  after(async () => {
    await db('TRUNCATE TABLE users CASCADE');  
    await db('TRUNCATE TABLE repayments CASCADE');
    await db('TRUNCATE TABLE loans CASCADE');
  });
  it ('should save profile pic in db if user is found', (done) => {
    chai.request(server).patch('/api/v1/users/uploads').attach('image', fs.readFileSync('./asset/avatar.PNG'), './asset/avatar.PNG').set('Authorization', userAuth1)
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('data');
        done();
      })
  })
  it ('should return error if image not provided', (done) => {
    chai.request(server).patch('/api/v1/users/uploads').attach('im', fs.readFileSync('./asset/avatar.PNG'), './asset/avatar.PNG')
      .set('Authorization', userAuth1)
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('error');
        done();
      })
  })
})
