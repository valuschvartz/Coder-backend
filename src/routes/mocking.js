import express from 'express';
import { faker } from '@faker-js/faker';
import PetRepository from '../repository/PetRepository.js';
import PetDao from '../dao/Pets.dao.js';

const router = express.Router();
const petRepository = new PetRepository(new PetDao());

function generatePetData() {
  return {
    name: faker.animal.cat(),
    specie: faker.animal.type(),
    birthDate: faker.date.birthdate({ min: 1, max: 10, mode: 'age' }),
    adopted: false,
    owner: null,
    image: `https://placekitten.com/${faker.number.int({min:200,max:400})}/${faker.number.int({min:200,max:400})}`
  };
}

router.get('/', async (req, res) => {
  const count = parseInt(req.query.count) || 100;

  if (isNaN(count)) {
    return res.status(400).json({ error: "El parámetro 'count' debe ser un número" });
  }

  try {
    const petsData = Array.from({ length: count }, () => generatePetData());

    const savedPets = [];
    for (const pet of petsData) {
      const saved = await petRepository.create(pet);
      savedPets.push(saved);
    }

    res.json(savedPets);
  } catch (error) {
    console.error('Error guardando mascotas:', error);
    res.status(500).json({ error: 'Error guardando mascotas en base de datos' });
  }
});

export default router;
