// Import modules
import request from "supertest";

// Import app
import app from "../../src/app";

// Import helpers
import { clearDatabase } from "../helpers";

describe("User creation", () => {
  afterAll(async () => {
    await clearDatabase();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a new user with same email from another", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(409);
    expect(response.body.error).toEqual("This user already exists");
  });

  it("Should not be able to create a new user without name", async () => {
    const response = await request(app).post("/users").send({
      email: "john@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("Missing data");
  });

  it("Should not be able to create a new user without email", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      password: "123456",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("Missing data");
  });

  it("Should not be able to create a new user without password", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("Missing data");
  });
});
