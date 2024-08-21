// Author: Artem Nikulin

const db = require('../db');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Controller function to render the overview page
exports.getOverview = catchAsync(async (req, res, next) => {
  // Query the database to fetch all products
  const products = await db.query('SELECT * FROM products');

  // Render the 'overview' template with the fetched products and a title
  res.status(200).render('overview', {
    title: 'Prologix - Головна', // Page title
    products: products, // Pass the fetched products to the template
  });
});

// Controller function to render product cards based on a selected category
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  // Extract category_id from the query parameters
  const { category_id } = req.query;

  // Check if category_id is provided; if not, create a custom error and pass it to the next middleware
  if (!category_id) {
    return next(new AppError('Category ID not specified', 400));
  }

  // Query the database to fetch products filtered by the specified category_id
  const products = await db.query(
    'SELECT * FROM products WHERE category_id = $1',
    [category_id] // Parameterized query to prevent SQL injection
  );

  // Render the 'partials/productCards' template with the filtered products
  res.status(200).render('partials/productCards', { products });
});
