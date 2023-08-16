// import { getProductCategory } from '../../client/src/redux/actions/productActions.js';
import Product from '../model/productSchema.js';


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({}).limit(10);

        response.json(products);
    }catch (error) {

    }
}

export const getProductById = async (request, response) => {
    try {
        const products = await Product.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {

    }
}

export const getProductByCategory= async (request, response) => {
    console.log(request.params.category,'cat')
    try {
        const products = await Product.find({ 'category': request.params.category }).limit(10);
        response.json(products);
    }catch (error) {

    }
}