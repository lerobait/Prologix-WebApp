// Author: Artem Nikulin & Nikonov Kirill

const ProductService = require('../models/productService');
const catchAsync = require('../utils/catchAsync');

class ProductController {
  // Method to handle getting a list of products based on query parameters
  getProducts = catchAsync(async (req, res) => {
    // Extract query parameters for categories, page, and limit
    const { categories, page, limit } = req.query;

    // Call the ProductService to get products based on the provided query parameters
    const result = await ProductService.getProducts({
      categories,
      page,
      limit,
    });

    // Respond with the result in JSON format and a status code of 200 (OK)
    res.status(200).json(result);
  });

  // Method to handle searching for products based on a search query and pagination parameters
  searchProducts = catchAsync(async (req, res) => {
    // Extract query parameters for search term, page, and limit
    const { search, page, limit } = req.query;

    // Call the ProductService to search for products based on the provided query parameters
    const result = await ProductService.searchProducts({
      search,
      page,
      limit,
    });

    // Respond with the result in JSON format and a status code of 200 (OK)
    res.status(200).json(result);
  });

  // Method to handle getting a single product by its code
  getProductByCode = catchAsync(async (req, res) => {
    // Extract the product code from the route parameters
    const { code } = req.params;

    // Call the ProductService to get the product details based on the provided code
    const product = await ProductService.getProductByCode(code);

    // Respond with the product details in JSON format and a status code of 200 (OK)
    res.status(200).json(product);
  });
}

module.exports = new ProductController();
