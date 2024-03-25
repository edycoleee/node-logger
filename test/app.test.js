//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application/web');
const { removeTestUser, createTestUser, getTestUser } = require('./test-util');


describe.skip('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe.skip('GET /api/users', () => {
  it('should return data from MySQL', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe.skip('POST /api/users', () => {
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

describe.skip('DELETE /api/users', () => {
  const USERNAME = 'john'
  const PASSWORD = 'john1'
  const NAME = 'john'

  beforeEach(async () => {
    await createTestUser(USERNAME, PASSWORD, NAME);
  })

  afterEach(async () => {
    await removeTestUser(USERNAME);
  })

  it('should can delete data', async () => {
    const response = await request(app)
      .delete('/api/users/' + USERNAME)
    expect(response.status).toBe(200);
    expect(response.text).toBe('Deleted Successfully');

    const testUser = await getTestUser(USERNAME);
    expect(testUser.length).toEqual(0);
  });
})

describe('PUT /api/users', () => {
  const USERNAME = 'john'
  const PASSWORD = 'john1'
  const NAME = 'john'

  //insert data sebelum test put 
  beforeEach(async () => {
    await createTestUser(USERNAME, PASSWORD, NAME);
  })

  //menghapus data setelah test insert 
  afterEach(async () => {
    await removeTestUser(USERNAME);
  })

  it('should put data to MySQL', async () => {
    let validData = { password: 'john1-rev', name: 'john-rev' };
    const response = await request(app)
      .put(`/api/users/john`)
      .send(validData);
    expect(response.status).toBe(201);
    expect(response.text).toBe('Data updated successfully');

    // Additional test to check if data is actually added to the database
    validData = { password: 'john1-rev', name: 'john-rev', "token": null, "username": "john" }
    const getDataResponse = await request(app).get(`/api/users/john`);
    expect(getDataResponse.status).toBe(200);
    expect(getDataResponse.body).toEqual(expect.arrayContaining([validData]));
  });

  it('should reject if request is not valid', async () => {
    const invalidData = { username: 'John' }; // Missing 'name, password' field
    const response = await request(app)
      .put(`/api/users/john`)
      .send(invalidData);
    expect(response.status).toBe(400);
  });

  it('should not found', async () => {
    const validData = { password: 'john1-rev', name: 'john-rev' };
    const response = await request(app)
      .put('/api/users/edy')
      .send(validData);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Data Not Found');
  });
});