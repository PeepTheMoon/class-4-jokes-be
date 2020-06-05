const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Hilarity = require('../lib/models/Hilarity');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();

  beforeAll(() => {
    return mongo.getUri()
    
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new joke', () => {
    return request(app)
      .post('/hilarity')
      .send({
        joke: 'What I\'m typing right here is super funny',
        comedian: 'Yours Truly'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          joke: 'What I\'m typing right here is super funny',
          comedian: 'Yours Truly',
          laughs: 0, 
          __v: 0 
        });
      });
  });
  
  it('gets a list of jokes', async() => {
    await Hilarity.create({
      joke: 'What I\'m typing right here is super funny',
      comedian: 'Yours Truly' 
    });

    return request(app)
      .get('/hilarity')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.anything(),
            joke: 'What I\'m typing right here is super funny',
            comedian: 'Yours Truly',
            laughs: 0,
            __v: 0
          }
        ]);
      });
  });

  it('gets a joke by id', async() => {
    const joke = await Hilarity.create({
      joke: 'What I\'m typing right here is super funny',
      comedian: 'Yours Truly'
    });

    return request(app)
      .get(`/hilarity/${joke._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: expect.anything(),
            joke: 'What I\'m typing right here is super funny',
            comedian: 'Yours Truly',
            laughs: 0,
            __v: 0
          });
      });
  });

  // it('allows a user to update a joke', async() => {
  //   const joke = await
  // })
});
