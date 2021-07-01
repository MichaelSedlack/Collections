const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    firstName: 'Ricardo',
    lastName: 'Ruiz',
    email: 'kxngvenom@gmail.com',
    passwordHash: 'testymctesterson'
  }
]

beforeEach(async () => {
  // Tear Down DB
  await User.deleteMany({});

  // Set users
  const userObjects = initialUsers.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());
  await Promise.all(promiseArray);
})

describe('/users/register', () => {

  test('User creation successfull', async () => {
    const newUser = {
      firstName: 'Tester',
      lastName: 'Testerson',
      email: 'testy@tester.com',
      passwordHash: 'test'
    }

  await api
    .post('/users/register')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  });

  test('User cannot be created with already used email', async () => {
    const newUser = {
      firstName: 'Tester',
      lastName: 'Testerson',
      email: 'kxngvenom@gmail.com',
      passwordHash: 'test'
    }

    await api
      .post('/users/register/')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(() => {
  mongoose.connection.close();
})