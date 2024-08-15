// Author: Artem Nikulin

const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

// Define a route for GET requests to '/products'
router.get('/products', productController.getAllProducts);

module.exports = router;
