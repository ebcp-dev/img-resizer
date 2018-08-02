import 'babel-polyfill';
import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import app from '../src/server';

// Test login credentials
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
let token;

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

describe('Test resize route', done => {
  it('Status 200 on successful resize', done => {
    request(app)
      .post('/api/resize')
      .set('Authorization', token)
      .send(testInput.image)
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        expect(res.type).equals('image/jpeg');
        done();
      });
  });
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
  it('Status 401 on unauthorized user', done => {
    request(app)
      .post('/api/resize')
      .send(testInput.image)
      .expect(401, done);
  });
});

after(done => {
  // Need to manually exit mocha
  process.exit(0);
});
