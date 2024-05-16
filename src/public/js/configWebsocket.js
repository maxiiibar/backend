const socketClient = io();

const form = document.getElementById('form')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputPrice = document.getElementById('price')
const inputThumbnail = document.getElementById('thumbnail')
const inputCode = document.getElementById('code')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')
const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const price = inputPrice.value;
    const description = inputDescription.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    const product = {
        title,
        price,
        description,
        thumbnail,
        code,
        stock,
        category
    }

    console.log()
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.title} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})