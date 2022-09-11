// Import database
import Users from "../../src/models/Users";

// Import rules
import createUser from "../../src/rules/userCreation";

// Import interfaces
import { IDatabaseError } from "../../src/interfaces/database";

// Import helpers
import { clearDatabase } from "../helpers";

describe("User creation", () => {
  afterAll(async () => {
    await clearDatabase();
  });

  it("Should be able to create a new user", async () => {
    const response = (await createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    })) as Users;

    expect(response).toBeInstanceOf(Users);
    expect(response.name).toEqual("John Doe");
    expect(response.email).toEqual("john@example.com");
    expect(response.password).toEqual("123456");
  });

  it("Should not be able to create a new user with same email from another", async () => {
    const response = (await createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    })) as IDatabaseError;

    expect(response).not.toBeInstanceOf(Users);
    expect(response.code).toEqual(409);
    expect(response.message).toEqual("This user already exists");
  });

  it("Should not be able to create a new user without name", async () => {
    // @ts-ignore
    const response = (await createUser({
      email: "john@example.com",
      password: "123456",
    })) as IDatabaseError;

    expect(response).not.toBeInstanceOf(Users);
    expect(response.code).toEqual(400);
    expect(response.message).toEqual("Missing data");
  });

  it("Should not be able to create a new user without email", async () => {
    // @ts-ignore
    const response = (await createUser({
      name: "John Doe",
      password: "123456",
    })) as IDatabaseError;

    expect(response).not.toBeInstanceOf(Users);
    expect(response.code).toEqual(400);
    expect(response.message).toEqual("Missing data");
  });

  it("Should not be able to create a new user without password", async () => {
    // @ts-ignore
    const response = (await createUser({
      name: "John Doe",
      email: "john@example.com",
    })) as IDatabaseError;

    expect(response).not.toBeInstanceOf(Users);
    expect(response.code).toEqual(400);
    expect(response.message).toEqual("Missing data");
  });
});
