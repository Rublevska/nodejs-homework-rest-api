require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/user");

const { DB_HOST_TEST } = process.env;

describe("test login function", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log("DB connected"))
      .catch((err) => console.error(err));

    await User.deleteMany();
  });

  it("register response status is 201", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "Sonia@gmail.com",
      password: "12345",
    });

    expect(response.statusCode).toBe(201);
  });

  it("login response status is 200", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "Sonia@gmail.com",
      password: "12345",
    });

    expect(response.statusCode).toBe(200);
  });

  it("login response contain token and object user with email and subscription", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "Sonia@gmail.com",
      password: "12345",
    });

    const userObj = {
      token: expect.any(String),
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    };

    expect(response.body).toStrictEqual(userObj);
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST_TEST)
      .then(() => console.log("DB connected"))
      .catch((err) => console.error(err));
  });
});
