import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { expect } from 'chai';

describe('Testing Pets', function () {
  this.timeout(10000);

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    }

    await mongoose.connection.collection('pets').insertMany([
      {
        name: 'Firulais',
        specie: 'dog',
        breed: 'mixed',
        age: 3,
        description: 'Mascota prueba 1',
        adoptionStatus: 'available',
        weight: 15,
        color: 'brown',
        vaccinated: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michi',
        specie: 'cat',
        breed: 'siamese',
        age: 2,
        description: 'Mascota prueba 2',
        adoptionStatus: 'available',
        weight: 5,
        color: 'white',
        vaccinated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  });

  after(async () => {
    await mongoose.connection.collection('pets').deleteMany({ name: { $in: ['Firulais', 'Michi'] } });
    await mongoose.connection.close();
  });

  it('Debe devolver un array de mascotas', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.status).to.equal(200);
    // El body es {status: "success", payload: [...]}
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('payload').that.is.an('array').and.to.have.length.greaterThan(0);

    const pet = res.body.payload[0];
    expect(pet).to.have.property('name');
    expect(pet).to.have.property('specie');
    expect(pet).to.have.property('breed');
    expect(pet).to.have.property('age');
    expect(pet).to.have.property('description');
    expect(pet).to.have.property('adoptionStatus');
    expect(pet).to.have.property('weight');
    expect(pet).to.have.property('color');
    expect(pet).to.have.property('vaccinated');
  });
});