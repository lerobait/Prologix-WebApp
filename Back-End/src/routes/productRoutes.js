// Author: Artem Nikulin & Nikonov Kirill

const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

// Define a route for GET requests to '/products'
router.get('/products', productController.getProducts);

// Route for searching products
router.get('/products/search', productController.searchProducts);

module.exports = router;
