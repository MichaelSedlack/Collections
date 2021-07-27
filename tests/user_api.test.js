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
      password: 'test'
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
      password: 'test'
    }

    await api
      .post('/users/register/')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)
  })

})

describe('/users/login', () => {

  test('Can login with valid user', async () => {
    const newUser = {
      firstName: 'Tester',
      lastName: 'Testerson',
      email: 'testy@tester.com',
      password: 'test'
    }


    await api
      .post('/users/register')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const loginObj = {
      email: newUser.email,
      password: newUser.password
    }
    
    const res = await api
      .post('/users/login')
      .send(loginObj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('id');
  })

  test('Cannot login with invalid email', async () => {
    const loginObj = {
      email: "testy@test.com",
      password: "123456"
    }

    const res = await api
      .post('/users/login')
      .send(loginObj)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe("User does not exist");
  })
  
  test('Cannot login with invalid password', async () => {
    const loginObj = {
      email: "kxngvenom@gmail.com",
      password: "123456"
    }

    const res = await api
      .post('/users/login')
      .send(loginObj)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe("Incorrect Password");
  })
})

afterAll(() => {
  mongoose.disconnect();
})
