process.env.RUN_MODE='test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {iteratee} = require('lodash');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('BytesGo', () =>{
  beforeEach((done) =>{
    done();
  });

  describe('/POST signup', () =>{
    // Test case 1.1
    it('it should signup successfully', (done) =>{
      const credential = {
        username: 'admin',
        email: 'admin01@gmail.com',
        password: 'admin',
        first_name: 'admin01',
        last_name: 'admin01',
        bio: 'The first user',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User register successfully!');
            res.body.data.should.have.property('username');
            done();
          });
    });

    // Test case 1.2
    it('it should not signup with existed username', (done) =>{
      const credential = {
        username: 'admin',
        email: 'admin02@gmail.com',
        password: 'admin',
        first_name: 'admin02',
        last_name: 'admin02',
        bio: 'The second admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Username is already in use!');
            done();
          });
    });

    it('it should not signup with existed email', (done) =>{
      const credential = {
        username: 'adminmin',
        email: 'admin01@gmail.com', // This email is already used by admin 1
        password: 'admin',
        first_name: 'admin02',
        last_name: 'admin02',
        bio: 'The second admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Username is already in use!');
            done();
          });
    });

    it('it should not signup without username', (done) =>{
      const credential = {
        email: 'admin03@gmail.com',
        password: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        bio: 'The third admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Username is missed');
            done();
          });
    });

    it('it should not signup without password', (done) =>{
      const credential = {
        email: 'admin03@gmail.com',
        password: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        bio: 'The third admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Password is missed');
            done();
          });
    });
  });

  describe('/POST login', () =>{
    // Test case 1.1
    it('it should login successfully', (done) =>{
      const credential = {
        username: 'admin',
        password: 'admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('successful');
            res.body.data.should.have.property('username').eql('admin');
            done();
          });
    });

    // Test case 1.2
    it('it should not login without password', (done) =>{
      const credential = {
        username: 'admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Login fail');
            done();
          });
    });

    it('it should not login without username', (done) =>{
      const credential = {
        username: 'admin',
      };

      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Login fail');
            done();
          });
    });

    it('it should not login with wrong username', (done) =>{
      const credential = {
        username: 'adminfake',
        password: 'admin',
      };
      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Login fail');
            done();
          });
    });

    it('it should not login with wrong password', (done) =>{
      const credential = {
        username: 'admin',
        password: '123456',
      };
      chai.request(server)
          .post('/auth/login')
          .send(credential)
          .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Login fail');
            done();
          });
    });
  });
});
