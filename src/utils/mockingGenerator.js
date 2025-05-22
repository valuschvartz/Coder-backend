import { faker } from '@faker-js/faker';
import { createHash } from './cryptoUtils.js';

export const generateMockPets = (quantity = 100) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: faker.animal.dog(),
      specie: 'dog',
      birthDate: faker.date.past(5).toISOString(),
      weight: faker.number.float({ min: 1, max: 40 }),
      adopted: false,
      owner: null
    });
  }

  return pets;
};

export const generateMockUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: createHash('coder123'),
  role: faker.helpers.arrayElement(['user', 'admin']),
  pets: []
});