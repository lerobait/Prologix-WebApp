// Author: Artem Nikulin

const db = require('../db');
const AppError = require('../utils/appError');

// Controller class for handling product-related requests.
class ProductController {
  /**
   * Handles GET requests to fetch products from the database.
   * @param {Object} req - The request object containing details of the HTTP request.
   * @param {Object} res - The response object used to send a response to the client.
   * @returns {Promise<void>} - A promise that resolves when the response has been sent.
   */

  async getAllProducts(req, res) {
    try {
      // Query the database to fetch all products
      const products = await db.any('SELECT * FROM products');
      // Send the products as a JSON response
      res.json(products);
    } catch (error) {
      // Handle errors that occur during the database query
      if (error instanceof AppError) {
        // If the error is an AppError, send the error details with the appropriate status code
        res.status(error.statusCode).json({ error: error.message });
      } else {
        // For other errors, create a generic AppError and send a 500 Internal Server Error response
        const appError = new AppError('Internal Server Error', 500);
        res.status(appError.statusCode).json({ error: appError.message });
      }
    }
  }
}

module.exports = new ProductController();
