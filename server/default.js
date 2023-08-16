

import Product from './model/productSchema.js';
import { products } from './constants/product.js';
// const fetch = require('node-fetch');
// // import products from '../utiltity/products.json'
// import * as product from '../utiltity/products.json';
// console.log(product)
// const jsonObject = JSON.parse(product);
// console.log(jsonObject, typeof(jsonObject)); // Outputs: { name: 'John', age: 30 }
// fetch('../utiltity/products.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));
const DefaultData = async () => {
    try {
        console.log("in")
        // await Product.deleteMany({});
        console.log("deleted")
        // console.log(products,typeof(products),typeof(jsonObject))
        // await Product.insertMany(products);

        console.log('Data imported Successfully');
        
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export default DefaultData;