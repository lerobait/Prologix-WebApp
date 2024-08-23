// Author: Artem Nikulin & Nikonov Kirill

const db = require('../db');
const AppError = require('../utils/appError');

// Controller class for handling product-related requests.
class ProductController {
  /**
   * Retrieves products from the database based on specified categories and optional search query.
   * It supports filtering by multiple categories, which are passed as a comma-separated list in the query parameter `categories`
   * It also supports pagination via `page` and `limit` query parameters.
   * 
   * @param {Object} req - The request object containing details of the HTTP request.
   * @param {Object} res - The response object used to send a response to the client.
   * @returns {Promise<void>} - A promise that resolves when the response has been sent.
   * 
   * @throws {AppError} - Throws an AppError if there is an issue with the database query or other processing errors.
   * 
   * @example
   * Example request: GET /?categories=2,5,8&page=1&limit=15
   * This will fetch products with category_id 2, 5, or 8, with pagination on page 1 and limit 40 products per page.
   */
  async getProducts(req, res) {
    const { categories, page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;
    const params = req.query.categories ? `?categories=${req.query.categories}` : '';
    let render = 'overview';

    let query = 'SELECT * FROM products';
    const queryParams = [];

    // Handle category filter
    if (categories) {
      // render = 'partials/productCards';
      const categoriesArray = categories.split(',');
      query += ' WHERE category_id = ANY($1::int[])';
      queryParams.push(categoriesArray.map(Number));
    }

    // Add pagination
    if (categories) {
      // Categories are provided, so LIMIT and OFFSET use $2 and $3
      query += ' LIMIT $2 OFFSET $3';
      queryParams.push(Number(limit), Number(offset));
    } else {
      // No categories, so LIMIT and OFFSET use $1 and $2
      query += ' LIMIT $1 OFFSET $2';
      queryParams.push(Number(limit), Number(offset));
}

    try {
      // Query the database to fetch all products
      const products = await db.any(query, queryParams);

      // Get total count for pagination info
      const totalCountQuery = 'SELECT COUNT(*) FROM products' + (categories ? ' WHERE category_id = ANY($1::int[])' : '');
      const totalCountResult = await db.one(totalCountQuery, categories ? [categories.split(',').map(Number)] : []);
      const totalCount = parseInt(totalCountResult.count, 10);

      res.status(200).render(render, {
        title: render === 'overview' ? 'Prologix - Головна' : '',
        params,
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page, 10),
      });
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

  /**
    * Searches for products based on a search query.
    * Supports pagination via `page` and `limit` query parameters.
    * 
    * @param {Object} req - The request object containing details of the HTTP request.
    * @param {Object} res - The response object used to send a response to the client.
    * @returns {Promise<void>} - A promise that resolves when the response has been sent.
    * 
    * @throws {AppError} - Throws an AppError if there is an issue with the database query or other processing errors.
    * 
    * @example
    * Example request: GET products/search?search=laptop&page=1&limit=15
    * This will fetch products where the title contains 'laptop', with pagination on page 1 and limit 40 products per page.
    */
  async searchProducts(req, res) {
    const { search, page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;
    const params = req.query.search ? `/products/search?search=${req.query.search}` : '';

    let query = 'SELECT * FROM products';
    const queryParams = [];

    if (search) {
      query += ' WHERE title ILIKE $1';
      queryParams.push(`%${search}%`);
    }

    // Add pagination
    query += ' LIMIT $2 OFFSET $3';
    queryParams.push(Number(limit), Number(offset));

    try {
      const products = await db.any(query, queryParams);

      //Get total count for pagination info
      const totalCountQuery = 'SELECT COUNT(*) FROM products' + (search ? ' WHERE title ILIKE $1' : '');
      const totalCountResult = await db.one(totalCountQuery, search ? [`%${search}%`] : []);
      const totalCount = parseInt(totalCountResult.count, 10);

      res.status(200).render('overview', {
        params,
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page, 10)
      });
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
