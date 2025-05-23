import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { expect } from 'chai';

const testUser = {
  first_name: 'Test',
  last_name: 'User',
  email: `testuser_${Date.now()}@example.com`,
  password: '1234',
  age: 30,
  role: 'user',
  isActive: true
};

let cookie;

describe('Testing Users', function () {
  this.timeout(10000);

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    const { deletedCount } = await mongoose.connection.db
      .collection('users')
      .deleteMany({ email: testUser.email });

    console.log(`Usuarios eliminados en after con email ${testUser.email}: ${deletedCount}`);

    await mongoose.connection.close();
  });

  it('Debe registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/sessions/register')
      .send(testUser);

    expect(res.status).to.equal(200); // según tu controlador es 200
    expect(res.body).to.have.property('status', 'success');

    // Cambiado: en lugar de message esperamos payload con id
    expect(res.body).to.have.property('payload').that.is.a('string');
  });

  it('Debe loguearse correctamente y devolver una cookie', async () => {
    const res = await request(app)
      .post('/api/sessions/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).to.equal(200);
    expect(res.headers['set-cookie']).to.exist;

    const cookieHeader = res.headers['set-cookie'][0];
    cookie = cookieHeader.split(';')[0];
  });

  it('Debe devolver el usuario actual con /current usando la cookie', async () => {
    const res = await request(app)
      .get('/api/sessions/current')
      .set('Cookie', cookie);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('payload');
    expect(res.body.payload.email).to.equal(testUser.email);
  });
});