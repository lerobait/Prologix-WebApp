// Author: Artem Nikulin

const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/products-by-category', viewsController.getProductsByCategory);

module.exports = router;
