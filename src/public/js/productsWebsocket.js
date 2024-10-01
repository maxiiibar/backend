const socketClient = io();

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputDescription = document.getElementById("description");
const inputCategory = document.getElementById("category");
const inputStock = document.getElementById("stock");
const products = document.getElementById("products");
const sessionInfo = document.getElementById("sessionInfo");

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const description = inputDescription.value;
  const stock = inputStock.value;
  const category = inputCategory.value;

  const product = {
    name,
    price,
    description,
    stock,
    category
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
