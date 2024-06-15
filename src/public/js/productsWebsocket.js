const socketClient = io();

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputDescription = document.getElementById("description");
const inputStock = document.getElementById("stock");
const products = document.getElementById("products");
const sessionInfo = document.getElementById("sessionInfo");

fetch("http://localhost:8080/users/info")
.then((response) => response.json())
.then((data) => {
   sessionInfo.innerHTML = `
        <p>Name: ${data.userName}</p>
        <p>Email: ${data.userMail}</p>
        <p>Role: ${data.role}</p>
        <p>Visit Count: ${data.contador}</p>
      `;
});

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const description = inputDescription.value;
  const stock = inputStock.value;

  const product = {
    name,
    price,
    description,
    stock,
  };
  socketClient.emit("newProduct", product);
};

socketClient.on("products", (arrayProducts) => {
  let infoProducts = "";
  arrayProducts.map((prod) => {
    infoProducts += `${prod.name} - $${prod.price} </br>`;
  });
  products.innerHTML = infoProducts;
});
