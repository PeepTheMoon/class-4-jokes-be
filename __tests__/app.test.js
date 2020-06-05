const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Hilarity = require('../lib/models/Hilarity');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();

  //connects to the db
  beforeAll(() => {
    return mongo.getUri()
    
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  //before each test, drops the database to test a fresh case each time
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  //afterwards, it closes the connection with mongoose and stops the server connection
  afterAll(() => {
    return mongoose.connection.close()
      .then(() => mongo.stop());
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
            _id: joke.id,
            joke: 'What I\'m typing right here is super funny',
            comedian: 'Yours Truly',
            laughs: 0,
            __v: 0
          });
      });
  });

  it('allows a user to update a joke', async() => {
    const joke = await Hilarity.create({
      joke: 'What I\'m typing right here is super funny',
      comedian: 'Yours Truly'
    });

    return request(app)
      .patch(`/hilarity/${joke._id}`)
      .send({
        comedian: 'Some Other Guy'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: joke.id,
          joke: 'What I\'m typing right here is super funny',
          comedian: 'Some Other Guy',
          laughs: 0,
          __v: 0
        });
      });
  });

  it('allows a user to delete a joke', async() => {
    const joke = await Hilarity.create({
      joke: 'What I\'m typing right here is super funny',
      comedian: 'Yours Truly'
    }); 

    return request(app)
      .delete(`/hilarity/${joke._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: joke.id,
            joke: 'What I\'m typing right here is super funny',
            comedian: 'Yours Truly',
            laughs: 0,
            __v: 0
          });
      });
  });

});
