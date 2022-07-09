const mongoose = require("mongoose");
/* const request = require("supertest"); */
require("dotenv").config();
const app = require("../app");
const { User } = require("../models/user");

const { DB_HOST } = process.env;

describe("auth test", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });
});
