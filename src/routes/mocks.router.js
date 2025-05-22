import { Router } from 'express';
import { faker } from '@faker-js/faker';
import PetRepository from '../repository/PetRepository.js';
import PetDao from '../dao/Pets.dao.js';
import UserRepository from '../repository/UserRepository.js';
import UserDao from '../dao/Users.dao.js';
import { generateMockUser } from '../utils/mockingGenerator.js';
import { createHash } from '../utils/cryptoUtils.js';

const router = Router();
const petRepository = new PetRepository(new PetDao());
const userRepository = new UserRepository(new UserDao());

// /api/mocks/mockingpets
router.get('/mockingpets', async (req, res) => {
  const count = parseInt(req.query.count) || 100;
  if (isNaN(count)) {
    return res.status(400).json({ error: "El parámetro 'count' debe ser un número" });
  }

  try {
    const petsData = Array.from({ length: count }, () => ({
      name: faker.animal.cat(),
      specie: faker.animal.type(),
      birthDate: faker.date.birthdate({ min: 1, max: 10, mode: 'age' }),
      adopted: false,
      owner: null,
      image: `https://placekitten.com/${faker.number.int({ min: 200, max: 400 })}/${faker.number.int({ min: 200, max: 400 })}`
    }));

    const savedPets = [];
    for (const pet of petsData) {
      const saved = await petRepository.create(pet);
      savedPets.push(saved);
    }

    res.json(savedPets);
  } catch (error) {
    res.status(500).json({ error: 'Error guardando mascotas en base de datos' });
  }
});

// /api/mocks/mockingusers
router.get('/mockingusers', (req, res) => {
  const count = parseInt(req.query.count) || 50;

  if (isNaN(count)) {
    return res.status(400).json({ error: "El parámetro 'count' debe ser un número" });
  }

  const users = Array.from({ length: count }, () => generateMockUser());
  res.json(users);
});

// /api/mocks/generateData
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const insertedUsers = [];
    for (let i = 0; i < users; i++) {
      const user = generateMockUser();
      const savedUser = await userRepository.create(user);
      insertedUsers.push(savedUser);
    }

    const insertedPets = [];
    for (let i = 0; i < pets; i++) {
      const pet = {
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.birthdate({ min: 1, max: 10, mode: 'age' }),
        adopted: false,
        owner: null,
        image: `https://placekitten.com/${faker.number.int({ min: 200, max: 400 })}/${faker.number.int({ min: 200, max: 400 })}`
      };
      const savedPet = await petRepository.create(pet);
      insertedPets.push(savedPet);
    }

    res.json({ users: insertedUsers.length, pets: insertedPets.length });
  } catch (err) {
    res.status(500).json({ error: 'Error generando datos', details: err.message });
  }
});

export default router;