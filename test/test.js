import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

const should = chai.should();
chai.use(chaiHttp);

describe('testing my app', () => {
  it('should respond with correct', (done) => {
    chai.request(server).get('/api/v1').end((err, res) => {
      res.body.should.equal('correct');
      done();
    });
  });
});
