import express from 'express';
// import products from '../data/Products.js';
import { getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview,
    getTopProducts} from '../controllers/productControllers.js';
import { protect, admin } from '../middleWare/authMiddleware.js';

const router = express.Router();
router.get('/top', getTopProducts);
router.route('/').
get(getProducts).
post(protect, 
    admin, 
    createProduct);
router.route('/:id').
get(getProductById).
put(protect, 
    admin, 
    updateProduct).
delete(protect, 
    admin, 
    deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview)

export default router;