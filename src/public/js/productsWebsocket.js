const socketClient = io();

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputDescription = document.getElementById('description')
const inputStock = document.getElementById('stock')
const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputname.value;
    const price = inputPrice.value;
    const description = inputDescription.value;
    const stock = inputStock.value;

    const product = {
        name,
        price,
        description,
        stock
    }

    console.log()
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.name} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})