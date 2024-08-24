// Author: Artem Nikulin & Nikonov Kirill

const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');

// Define a route for GET requests to '/'
router.get('/', viewsController.renderProductsOverview);

// Route for searching products
router.get('/products/search', viewsController.renderSearchResults);

// Route for product page
router.get('/products/:code', viewsController.renderProductByCode);

router.get('/info', viewsController.renderInfo);

module.exports = router;
