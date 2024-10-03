import { describe, test, before } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const getRandomNumber = () => {
  return Math.floor(Math.random() * 51) + 50;
};

const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 100000 }),
    stock: getRandomNumber(),
    category: faker.commerce.productAdjective(),
  };
};

const mockUser = () => {
  const lastName = faker.person.lastName("female");
  return {
    firstName: faker.person.firstName("female"),
    lastName: lastName,
    gender: faker.person.sex(),
    email: faker.internet.email({lastName}),
    password: faker.internet.password(),
  };
};

const apiURL = "http://localhost:3005/api";

describe("TEST API REST", () => {
  test("[POST] /users/register", async () => {
    const body = mockUser();
    const response = await fetch(apiURL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    assert.equal(response.status, 200);
    assert.ok(responseJson.data.user._id, "El usuario debería tener un id");
    assert.equal(typeof responseJson.data.user.email, "string", "El email debería ser una cadena de texto");
    assert.equal(responseJson.data.user.firstName, body.firstName, "El nombre debería coincidir");
    assert.equal(responseJson.data.user.lastName, body.lastName, "El apellido debería coincidir");
    assert.equal(responseJson.data.user.email, body.email, "El email debería coincidir");
    const invalidBody = { ...body, email: "correo-no-valido" };
    const responseInvalid = await fetch(apiURL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidBody),
    });
    assert.equal(responseInvalid.status, 401);
  });
});
