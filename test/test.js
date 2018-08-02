/** @module test/test */

/** Import babel-polyfill to allow ES6 syntax. */
import 'babel-polyfill';
/** Import test dependencies. */
import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
/** Import express server from the server file. */
import app from '../src/server';

/** Test input. */
const testInput = {
  testLogin: {
    username: 'testemail@gmail.com',
    password: 'password'
  },
  emptyLogin: {
    username: '',
    password: ''
  },
  image: {
    imgUrl:
      'https://images.pexels.com/photos/1277485/pexels-photo-1277485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  invalidImage: {
    invalidUrl: 'https://'
  },
  emptyImage: {
    emptyUrl: ''
  },
  reqObj: {},
  downloadError: {
    invalidLink: 'https://images.pexels.com/photos/1277485/pexels-photo'
  }
};
/** Define session token to pass in to Authorization Header later. */
let token;
/** Login and get token before running tests. */
before(done => {
  request(app)
    .post('/api/auth/login')
    .send(testInput.testLogin)
    .expect(200)
    .end((err, res) => {
      token = res.body.session;
      expect(res.body.success).to.be.true;
      done();
    });
});
/** Test login route if successful.
 * Expect 400 if empty.
 */
describe('Test login route', done => {
  it('Status 200 on successful login', done => {
    request(app)
      .post('/api/auth/login')
      .send(testInput.testLogin)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.be.true;
        done();
      });
  });
  it('Status 400 on empty login input', done => {
    request(app)
      .post('/api/auth/login')
      .send(testInput.emptyLogin)
      .expect(400, done);
  });
});
/** Test resize route. */
describe('Test resize route', done => {
  /** Status 200 on succesful resize.
   * Also expect if response type is jpeg.
   */
  it('Status 200 on successful resize', done => {
    request(app)
      .post('/api/resize')
      .set('Authorization', token)
      .send(testInput.image)
      .expect(200)
      .end((err, res) => {
        expect(res.type).equals('image/jpeg');
        done();
      });
  });
  /** Status 400 if empty url from request body. */
  it('Status 400 on empty url', done => {
    request(app)
      .post('/api/resize')
      .set('Authorization', token)
      .send(testInput.emptyImage)
      .expect(400)
      .end((err, res) => {
        expect(res.body.imgUrl).equals('Invalid URL.');
        done();
      });
  });
  /** Status 400 if no request object from request body. */
  it('Status 400 on empty request object', done => {
    request(app)
      .post('/api/resize')
      .set('Authorization', token)
      .send(testInput.reqObj)
      .expect(400)
      .end((err, res) => {
        expect(res.body.imgUrl).equals('Invalid URL.');
        done();
      });
  });
  /** Status 400 if invalid url from request body. */
  it('Status 400 on invalid url', done => {
    request(app)
      .post('/api/resize')
      .set('Authorization', token)
      .send(testInput.invalidImage)
      .expect(400)
      .end((err, res) => {
        expect(res.body.imgUrl).equals('Invalid URL.');
        done();
      });
  });
  /** Status 401 if unauthorized user tries to access th route.. */
  it('Status 401 on unauthorized user', done => {
    request(app)
      .post('/api/resize')
      .send(testInput.image)
      .expect(401, done);
  });
});
/** Need to manually terminate mocha after tests. */
after(done => {
  process.exit(0);
});
