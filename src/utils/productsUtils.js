import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        name: faker.commerce.productName()+ ", " + faker.commerce.productAdjective() + " and " + faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: Math.floor(Math.random() * 1501),
        category: faker.commerce.department()
    }
}