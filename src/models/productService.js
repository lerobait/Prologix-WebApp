// Author: Artem Nikulin & Nikonov Kirill

const db = require('../db');
const AppError = require('../utils/appError');

class ProductService {
  // Method to get a list of products based on categories and pagination
  async getProducts({ categories, page = 1, limit = 15 }) {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products'; // Base query to select products
    const queryParams = []; // Array to store query parameters

    // Check if categories are provided
    if (categories) {
      // Convert categories from string to an array of integers
      const categoriesArray = categories.split(',');
      // Update query to filter by category_id
      query += ' WHERE category_id = ANY($1::int[])';
      queryParams.push(categoriesArray.map(Number)); // Add categories to query parameters

      // Add LIMIT and OFFSET for pagination
      query += ' LIMIT $2 OFFSET $3';
      queryParams.push(Number(limit), Number(offset)); // Add limit and offset to query parameters
    } else {
      // Add LIMIT and OFFSET for pagination if no categories are provided
      query += ' LIMIT $1 OFFSET $2';
      queryParams.push(Number(limit), Number(offset)); // Add limit and offset to query parameters
    }

    try {
      // Execute the query to get the products
      const products = await db.any(query, queryParams);

      // Query to get the total count of products (with optional category filter)
      const totalCountQuery =
        'SELECT COUNT(*) FROM products' +
        (categories ? ' WHERE category_id = ANY($1::int[])' : '');

      // Execute the query to get the total count of products
      const totalCountResult = await db.one(
        totalCountQuery,
        categories ? [categories.split(',').map(Number)] : []
      );
      const totalCount = parseInt(totalCountResult.count, 10); // Parse the count to an integer

      // Return an object containing products, total count, total pages, and current page
      return {
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit), // Calculate total pages
        currentPage: parseInt(page, 10), // Parse the current page to an integer
      };
    } catch (error) {
      // Throw a custom error if there is an issue fetching products
      throw new AppError('Error fetching products', 500);
    }
  }

  // Method to search for products based on a search term and pagination
  async searchProducts({ search, page = 1, limit = 15 }) {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products'; // Base query to select products
    const queryParams = []; // Array to store query parameters

    // Check if a search term is provided
    if (search) {
      // Update query to filter by title using a case-insensitive search
      query += ' WHERE title ILIKE $1';
      queryParams.push(`%${search}%`); // Add search term to query parameters
    }

    // Add LIMIT and OFFSET for pagination
    query += search ? ' LIMIT $2 OFFSET $3' : ' LIMIT $1 OFFSET $2';
    queryParams.push(Number(limit), Number(offset)); // Add limit and offset to query parameters

    try {
      // Execute the query to search for products
      const products = await db.any(query, queryParams);

      // Query to get the total count of products (with optional search filter)
      const totalCountQuery =
        'SELECT COUNT(*) FROM products' +
        (search ? ' WHERE title ILIKE $1' : '');

      // Execute the query to get the total count of products
      const totalCountResult = await db.one(
        totalCountQuery,
        search ? [`%${search}%`] : []
      );
      const totalCount = parseInt(totalCountResult.count, 10); // Parse the count to an integer

      // Return an object containing products, total count, total pages, current page, and search term
      return {
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit), // Calculate total pages
        currentPage: parseInt(page, 10), // Parse the current page to an integer
        search, // Include the search term in the result
      };
    } catch (error) {
      // Throw a custom error if there is an issue searching for products
      throw new AppError('Error searching products', 500);
    }
  }

  // Method to get a single product by its unique code
  async getProductByCode(code) {
    try {
      // Execute the query to get the product details based on the code
      const product = await db.one('SELECT * FROM products WHERE code = $1', [
        code,
      ]);
      return product; // Return the product details
    } catch (error) {
      // Throw a custom error if the product is not found
      throw new AppError('Product not found', 404);
    }
  }
}

module.exports = new ProductService();
