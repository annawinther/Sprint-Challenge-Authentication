const db = require('../database/dbConfig');
const Users = require('./routesmodel');
const route = require('./routes');
const request = require('supertest');

beforeEach(async () => {
    await db('users').truncate();
  });

  describe('Users.insert', () => {
    it('is able to add user to the db!', async () => {
      // sanity: checking that trucate works, essentially

      let users = await Users.getAll();
      expect(users).toHaveLength(0);
  
      // set up
      await Users.insert({ username: 'Helen', password: '12345' });
    //   await Users.insert({ password: '12345' });
      users = await Users.getAll();
  
      // assertion
      expect(users).toHaveLength(1);
    });
  
    // it('is able to insert the correct users', async () => {
    //   // sanity: checking that trucate works, essentially
    //   let users = await Users.getAll();
    //   expect(users).toHaveLength(0);
  
    //   // set up
    //   await Users.insert({ username: 'Aragorn' });
    //   await Users.insert({ username: 'Sauron' });
    //   users = await Users.getAll();
  
    //   expect(users[0].username).toBe('Aragorn');
    //   expect(users[1].username).toBe('Sauron');
    // });
  
    it('returns the newly inserted user', async () => {
      const user = await Users.insert({ username: 'Helen', password: '12345' });
      expect(user.username).toBe('Helen');
      expect(user.password).toBe('12345')
    });
  });

  describe('getJokes', () => {
    it('[GET] /api/jokes works', () => {
        // test not working now because its not authenticated
        // need to authenticate user before getting jokes
        // send valid username and password to give back token
        return request(route)
            .get('/api/jokes')
            .expect(200)
            .expect("")
            .expect('Content-Type', /json/)
            // .expect('Content-Length', '12')
            .then(res => {
                expect(res.body).toEqual(res.data.results);
            });
    })
})