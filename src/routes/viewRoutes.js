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

router.get('/about', viewsController.renderAbout);

router.get('/components', viewsController.renderComponents);

router.get('/login', viewsController.renderAuthorization);

router.get('/registration', viewsController.renderRegistration);

router.get('/profile', viewsController.renderProfile);

module.exports = router;
