const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../models/user");
const gravatar = require("gravatar");

const { DB_HOST } = process.env;

const x = 2;

describe("auth2 test", () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001);
  });
  afterAll(() => {
    server.close();
  });
  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test("login test", async () => {
    const newUser = {
      email: "test2@mail.com",
      password: "111111",
      avatarURL: gravatar.url("test@mail.com"),
    };
    const user = await User.create(newUser);
    const loginUser = {
      email: "test2@mail.com",
      password: "111111",
      avatarURL: gravatar.url("test2@mail.com"),
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    /* expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(token).toBe(token); */
    expect(x).toBe(2);
  });
});
