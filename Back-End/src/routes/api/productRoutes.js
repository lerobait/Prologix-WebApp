// Author: Artem Nikulin & Nikonov Kirill

const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

/**
 * @swagger
 *
 * tags:
 *  name: Products
 *  description: Operations related to products
 * */

/**
 * @swagger
 *
 * /api/products:
 *  get:
 *    tags: [Products]
 *    description: Get a list of products based on query parameters
 *    parameters:
 *      - name: categories
 *        in: query
 *        description: Comma-separated list of category IDs
 *        required: false
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response with a list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                products:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: Product ID
 *                      name:
 *                        type: string
 *                        description: Product name
 *                      price:
 *                        type: number
 *                        format: float
 *                        description: Product price
 *      400:
 *        description: Invalid query parameters
 */
router.get('/products', productController.getProducts);

/**
 * @swagger
 *
 * /api/products/search:
 *  get:
 *    tags: [Products]
 *    description: Search for products based on a search query
 *    parameters:
 *      - name: search
 *        in: query
 *        description: Search term
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response with a list of products matching the search query
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                products:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: Product ID
 *                      name:
 *                        type: string
 *                        description: Product name
 *                      price:
 *                        type: number
 *                        format: float
 *                        description: Product price
 *      400:
 *        description: Invalid search parameters
 */
router.get('/products/search', productController.searchProducts);

/**
 * @swagger
 *
 * /api/products/{code}:
 *  get:
 *    tags: [Products]
 *    description: Get a single product by its code
 *    parameters:
 *      - name: code
 *        in: path
 *        description: Product code
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response with product details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Product ID
 *                name:
 *                  type: string
 *                  description: Product name
 *                price:
 *                  type: number
 *                  format: float
 *                  description: Product price
 *      404:
 *        description: Product not found
 */
router.get('/products/:code', productController.getProductByCode);

module.exports = router;
