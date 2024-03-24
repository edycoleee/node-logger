//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application/web');
const { removeTestUser } = require('./test-util');


describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe('GET /api/users', () => {
  it('should return data from MySQL', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe('POST /api/users', () => {
  const USERNAME = 'john'
  //menghapus data setelah test insert 
  afterEach(async () => {
    await removeTestUser(USERNAME);
  })

  it('should add new data to MySQL', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: USERNAME, password: 'john1', name: 'john' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Data inserted successfully');

    // Additional test to check if data is actually added to the database
    // const getDataResponse = await request(app).get('/data');
    // expect(getDataResponse.status).toBe(200);
    // expect(getDataResponse.body).toEqual(expect.arrayContaining([data]));
  });

  it('should reject if request is not valid', async () => {
    const invalidData = { username: 'John' }; // Missing 'name, password' field
    const response = await request(app)
      .post('/api/users')
      .send(invalidData);
    expect(response.status).toBe(400);
    //expect(response.body.errors).toBeDefined();
  });

});