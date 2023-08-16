import express from  'express';
import { getProductById, getProducts ,getProductByCategory} from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
// import { addItemInCart } from '../controller/cart-controller.js';
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';
import { historySave } from '../controller/history-controller.js';
const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product-category-wise/:category',getProductByCategory)
router.get('/product/:id', getProductById);

// router.post('/cart/add', addItemInCart);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

router.post('/history', historySave);

export default router;