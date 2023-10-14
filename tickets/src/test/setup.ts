import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
  // Promise<string[]>;
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin =  () => {

  //Build a JWT paylod. {id, email}
  const paylod = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };


  //Create the JWT!
  const token = jwt.sign(paylod, process.env.JWT_KEY!);


  //Build a session Object. { jwt: MY_JWT }
  const session = { jwt: token };


  //Turn that session into JSON.
  const sessionJSON = JSON.stringify(session);


  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //returns a string thats the cookie with the encoded data
  return [`session=${base64}`];
  
};



// global.signin = async () => {
  // const email = 'test@test.com';
  // const password = 'password';

  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email,
  //     password,
  //   })
  //   .expect(201);

  // const cookie = response.get('Set-Cookie');

  // return cookie;
// };

