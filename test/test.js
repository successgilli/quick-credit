import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import server from '../server/app';
import userData from '../server/model/mock';

const should = chai.should();
chai.use(chaiHttp);
let loanId; let loanId2;
// test welcome route
describe('welcome route', () => {
  it('should welcome users to the route', (done) => {
    chai.request(server).get('/api/v1').end((err, res) => {
      console.log(res.body)
      res.body.data.should.equal('welcome to Gilberts API..for docs, add "quickcreditgilli.herokuapp.com/api-docs" to navigate other routes');
      done();
    })
  })
})
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
  it('sign in another user into db', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(userData.anodaUser).end((err, res) => {
      res.should.be.json;
      res.body.status.should.equal(200);
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
    chai.request(server).patch('/api/v1/users/*/verify').end((err, res) => {
      res.body.status.should.equal(404);
      res.body.error.should.equal('route does not exist. check the route, especially if the route param is of required type.');
      done();
    });
  });
  it('should return user not found if not found', (done) => {
    chai.request(server).patch('/api/v1/users/successgillippman@gmail.com/verify').end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('user not in database');
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
  it('it should post another loan application to db', (done) => {
    userData.loanAppGood.email = 'success@gmail.com';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      res.body.should.have.property('data');
      res.body.status.should.equal(201);
      // eslint-disable-next-line prefer-destructuring
      loanId2 = res.body.data.loanId;
      done();
    });
  });
  it('it should reject application if user has outstanding loan', (done) => {
    userData.loanAppGood.email = 'successgilli@gmail.com';
    chai.request(server).post('/api/v1/loans/').send(userData.loanAppGood).end((err, res) => {
      console.log(res.body, 'this')
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
// test aprove/reject loan route. 
describe('approve/reject loan route', () => {
  it('should respond with "not found" if loanId not found', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('loan not in database');
      done();
    });
  });
  it('should respond with validate input for either approve or reject', (done) => {
    let status = { status: '' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    });
  });
  it('should require status field', (done) => {
    let status = { armpit: '' };
    chai.request(server).patch('/api/v1/loans/100000000000').send(status).end((err, res) => {
      res.body.status.should.equal(400);
      done();
    });
  });
  it('should approve loan of a verifed user', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId}`).send(status).end((err, res) => {
      console.log(res.body)
      res.body.status.should.equal(201);
      res.body.should.have.property('data');
      done();
    });
  });
  it('should not approve or reject a loan already approved or rejected', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId}`).send(status).end((err, res) => {
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
      done();
    });
  });
  it('should not approve the loan of a user not verified', (done) => {
    let status = { status: 'approve' };
    chai.request(server).patch(`/api/v1/loans/${loanId2}`).send(status).end((err, res) => {
      res.body.status.should.equal(400);
      res.body.error.should.equal('user is not yet verifed');
      done();
    });
  });
  it('should be able to reject loan application', (done) => {
    let status = { status: 'reject' };
    chai.request(server).patch(`/api/v1/loans/${loanId2}`).send(status).end((err, res) => {
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
      .send(input).end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('amount can only be either integer or float');
        done();
      })
  })
  it('should respond with loan not found if not found', (done) => {
    input = { amount: '2000' };
    chai.request(server).post('/api/v1/loans/12323000000/repayment')
      .send(input).end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('loan not found');
        done();
      })
  })
  it('should not post repayment for rejected or pending loan', (done) => {
    input = { amount: '2000' };
    chai.request(server).post(`/api/v1/loans/${loanId2}/repayment`)
      .send(input).end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal(`you cant post repayment for the loan '${loanId2}' not yet approved`);
        done();
      })
  })
  it('should not post repayment for amount greater than loan balance', (done) => {
    input = { amount: '70000' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('repayed amount cannot be greater than loan balance');
        done();
      })
  })
  it('should post loan into repayment db', (done) => {
    input = { amount: '31500' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).end((err, res) => {
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        done();
      })
  })
  it('should tell if repayment already complete and not repay', (done) => {
    input = { amount: '31500' };
    chai.request(server).post(`/api/v1/loans/${loanId}/repayment`)
      .send(input).end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('loan already fully paid');
        done();
      })
  })
})
// test view repayment history route.
describe('Get repayment history route', () => {
  it('should respond loan not found if loan id not in db', (done) => {
    chai.request(server).get(`/api/v1/loans/1000000000/repayments`).end((err, res) => {
      res.body.should.have.status(400);
      res.body.error.should.equal('loan with id: 1000000000 not found');
      done();
    })
  })
  it('should respond with no repayment message if loan has no repayment yet', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId2}/repayments`).end((err, res) => {
      res.body.should.have.status(400);
      res.body.error.should.equal(`loan with id: ${loanId2} has no repayment`);
      done();
    })
  })
  it('should respond with loan repayment if loanId found in db', (done) => {
    chai.request(server).get(`/api/v1/loans/${loanId}/repayments`).end((err, res) => {
      res.body.should.have.status(200);
      res.body.data.should.be.a('array');
      done();
    })
  })
})
// test get loans route.
describe('GET loans route', () => {
  it('should return error if only one query string is given', (done) => {
    chai.request(server).get('/api/v1/loans?status').end((err, res) => {
      res.body.error.should.equal('both status and repaid query keys are required');
      done();
    })
  })
  it('should return error if query keys have wrong values', (done) => {
    chai.request(server).get('/api/v1/loans?status=armpit&repaid=bearbear').end((err, res) => {
      res.body.error.should.equal('status value must be a string of either approved or rejected,repaid value must be a string of either true or false');
      done();
    })
  })
  it('should return all loans in db if no query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans').end((err, res) => {
      res.body.should.have.property('data')
      done();
    })
  })
  it('should return queried loans in db if query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans?status=approved&repaid=false').end((err, res) => {
      console.log(res.body)
      res.body.should.have.property('data')
      done();
    })
  })
  it('should return queried loans in db if query strings are given', (done) => {
    chai.request(server).get('/api/v1/loans?status=approved&repaid=true').end((err, res) => {
      console.log(res.body)
      res.body.should.have.property('data')
      done();
    })
  })
})

describe('test the upload picture route', () => {
  it ('should return no user found if email not in db', (done) => {
    chai.request(server).patch('/api/v1/users/uploads/armpit@gmail.com').end((err, res) => {
      res.body.error.should.equal('user not found');
      done();
    })
  })
  it ('should save profile pic in db if user is found', (done) => {
    chai.request(server).patch('/api/v1/users/uploads/successgilli@gmail.com').attach('image', fs.readFileSync('./asset/avatar.PNG'), './asset/avatar.PNG').end((err, res) => {
      res.body.should.have.property('data');
      console.log(res.body)
      done();
    })
  })
})
