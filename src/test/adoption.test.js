import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { expect } from 'chai';

const testUserId = new mongoose.Types.ObjectId();
const testPetId = new mongoose.Types.ObjectId();

describe('Adoptions Router Functional Tests', function () {
  this.timeout(10000);

  let createdAdoptionId; // <-- Para guardar el ID de la adopción creada

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    }

    // Upsert usuario de prueba
    await mongoose.connection.collection('users').updateOne(
      { _id: testUserId },
      {
        $set: {
          first_name: 'Test',
          last_name: 'User',
          email: `testuser_adoptions_${Date.now()}@example.com`,
          password: 'hashedpassword',
          age: 30,
          role: 'user',
          isActive: true
        },
      },
      { upsert: true }
    );

    // Upsert mascota de prueba
    await mongoose.connection.collection('pets').updateOne(
      { _id: testPetId },
      {
        $set: {
          name: 'Firulais',
          specie: 'dog',
          breed: 'mixed',
          age: 3,
          description: 'Mascota de prueba',
          adoptionStatus: 'available',
          weight: 15,
          color: 'brown',
          vaccinated: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      },
      { upsert: true }
    );

    // Limpiar adopciones previas en base a userId y petId (según esquema)
    await mongoose.connection.collection('adoptions').deleteMany({ userId: testUserId.toString(), petId: testPetId.toString() });
  });

  after(async () => {
    if (createdAdoptionId) {
      await mongoose.connection.collection('adoptions').deleteOne({ _id: mongoose.Types.ObjectId(createdAdoptionId) });
    }
    await mongoose.connection.collection('users').deleteOne({ _id: testUserId });
    await mongoose.connection.collection('pets').deleteOne({ _id: testPetId });

    await mongoose.connection.close();
  });

  it('GET /api/adoptions - should return all adoptions', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('payload').that.is.an('array');
  });

  it('POST /api/adoptions/:uid/:pid - should create a new adoption', async () => {
    const res = await request(app).post(`/api/adoptions/${testUserId}/${testPetId}`);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('payload');

    // Asumiendo que el payload incluye userId y petId (ajusta a tu respuesta real)
    expect(res.body.payload.userId).to.equal(testUserId.toString());
    expect(res.body.payload.petId).to.equal(testPetId.toString());

    createdAdoptionId = res.body.payload._id; // Guardamos para el siguiente test
  });

  it('GET /api/adoptions/:aid - should return adoption by id', async function () {
    if (!createdAdoptionId) this.skip();

    const res = await request(app).get(`/api/adoptions/${createdAdoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload._id).to.equal(createdAdoptionId);
  });

  it('GET /api/adoptions/:aid - should return 404 for non-existent adoption', async () => {
    const nonExistentId = '000000000000000000000000';
    const res = await request(app).get(`/api/adoptions/${nonExistentId}`);
    expect(res.status).to.equal(404);
  });
});