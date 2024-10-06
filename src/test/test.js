import { describe, test, before } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";
import mongoose from "mongoose";

import { UserModel } from "../persistence/daos/mongodb/models/userModel.js";
import { ProductModel } from "../persistence/daos/mongodb/models/productModel.js";
import { CartModel } from "../persistence/daos/mongodb/models/cartModel.js";
import config from "../../config.js";

const getRandomNumber = () => {
  return Math.floor(Math.random() * 51) + 50;
};

const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
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
    role: 'premium'
  };
};

const apiURL = "http://localhost:3005/api";

let token, email, productId;

describe("TEST API REST", () => {
  before(async () => {
    await mongoose.connect(config.MONGO_URL);
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
    await CartModel.deleteMany({});
  });
  test("[POST] /users/register", async () => {
    const body = mockUser();
    email = body.email;
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
    token = responseJson.data.token;
    
    const invalidBody = { ...body, email: "correo-no-valido" };
    const responseInvalid = await fetch(apiURL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidBody),
    });
    const responseInvalidJson = await responseInvalid.json();
    assert.equal(responseInvalidJson.status, 400);
    assert.ok(responseInvalidJson.data, "Debería contener un mensaje de error indicando que el correo es inválido.");
    assert.ok(responseInvalidJson.data.includes("Invalid email format."), "El mensaje de error debería indicar que el correo electrónico es inválido");

    const responseDuplicate = await fetch(apiURL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseDuplicateJson = await responseDuplicate.json();
    assert.equal(responseDuplicateJson.status, 400);
    assert.ok(responseDuplicateJson.data, "Debería devolver un mensaje de error para usuarios duplicados.");
    assert.ok(responseDuplicateJson.data.includes("Email already registered."), "El mensaje de error debería indicar que el email ya está registrado.");
  });
  test("[POST] /products", async () => {
    const body = mockProduct();
    const response = await fetch(apiURL + "/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
      },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    assert.equal(response.status, 200, "El producto debería agregarse correctamente");
    assert.ok(responseJson.data._id, "El producto debería tener un id");
    assert.equal(typeof responseJson.data._id, "string", "El id debería ser una cadena de texto");
    assert.equal(responseJson.data.name, body.name, "El nombre debería coincidir");
    assert.equal(responseJson.data.description, body.description, "La descripción debería coincidir");
    assert.equal(responseJson.data.price, body.price, "El precio debería coincidir");
    assert.equal(responseJson.data.stock, body.stock, "El stock debería coincidir");
    assert.equal(responseJson.data.category, body.category, "La categoría debería coincidir");
    assert.equal(responseJson.data.owner, email, "El email debería coincidir");
    productId = responseJson.data._id;

    const invalidBody = { name: "Guantes profesionales", description: ""};
    const responseInvalid = await fetch(apiURL + "/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
      },
      body: JSON.stringify(invalidBody),
    });
    const responseInvalidJson = await responseInvalid.json();
    assert.equal(responseInvalidJson.status, 500);
    assert.ok(responseInvalidJson.error, "Debería contener un mensaje de error indicando que el correo es inválido.");

    const responseDuplicate = await fetch(apiURL + "/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
      },
      body: JSON.stringify(body),
    });
    
    const responseDuplicateJson = await responseDuplicate.json();
    assert.equal(responseDuplicateJson.status, 500);
    assert.ok(responseDuplicateJson.error, "Debería devolver un mensaje de error para usuarios duplicados.");
  });
  test("[GET] /carts/own", async () => {
    const body = mockProduct();
    const response = await fetch(apiURL + "/carts/own", {
      method: "GET",
      headers: {
        "Cookie": `token=${token}`
      },
    });
    const responseJson = await response.json();
    assert.equal(responseJson.status, 200, "El producto debería agregarse correctamente");
    assert.ok(responseJson.data._id, "El carrito debería tener un id");
    assert.equal(typeof responseJson.data._id, "string", "El id debería ser una cadena de texto");
    assert.equal(responseJson.data.products.length, 0);
  });
  test("[POST] /carts/product/:idProd", async () => {
    const response = await fetch(apiURL + "/carts/product/" + productId, {
      method: "POST",
      headers: {
        "Cookie": `token=${token}`
      },
    });
    const responseJson = await response.json();    
    assert.equal(responseJson.status, 401, "El producto no debería agregarse correctamente");
    assert.ok(responseJson.error, "Debería contener un mensaje de error que indique que no se puede agregar productos propios al carrito." )
    assert.ok(responseJson.error.includes("You can't add your own products."), "El mensaje de error debería indicar que no se puede agregar productos propios al carrito.");
  });
});
