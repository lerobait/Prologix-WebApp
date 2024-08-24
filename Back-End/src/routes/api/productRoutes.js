// Author: Artem Nikulin & Nikonov Kirill

const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

// Define a route for GET requests to '/products'
router.get('/products', productController.getProducts);

// Route for searching products
router.get('/products/search', productController.searchProducts);

// Route for get one product by code
router.get('/products/:code', productController.getProductByCode);

module.exports = router;
